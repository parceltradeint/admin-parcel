import { createContext, useContext, useEffect, useState } from "react";
// import { getInitials } from '../lib/stringUtils';
import * as React from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { fbAuth } from "../Config/firebase-config";
import { errorAlert } from "@/common/SweetAlert";
import axios from "axios";

export const UserContext = createContext({
  user: "",
  setUser: () => {},
  loadingUser: true,
  error: null,
});

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.
  const [error, setError] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    setLoadingUser(true);
    const unsubscriber = onAuthStateChanged(fbAuth, async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL, emailVerified } = user;
          // console.log("User", user);
          // const initials = `${displayName ? getInitials(displayName) : "NA"}`;
          // const authToken = await user.getIdTokenResult();
          // const token = await user?.getIdToken(true);
          let isExitingUser = await axios.get(`/api/user?uid=${user.uid}`);
          // locationWithIp(uid);
          setUser({ ...user, ...isExitingUser.data });

          setLoadingUser(false);
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        setError(error);
        setLoadingUser(false);
        setUser(null);
        try {
          await getAuth().signOut();
          setUser(null);
        } catch (err) {
          return errorAlert(err?.code);
        }
      } finally {
        setLoadingUser(false);
      }
    });
    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, error }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    return errorAlert("useUser must be used within a UserContextProvider");
    // throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
