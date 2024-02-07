import { fbAuth } from "@/AuthenticApp/Config/firebase-config";
import "firebase/auth";
import {
  getAuth,
  OAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signInWithCustomToken,
  GoogleAuthProvider,
  updateProfile,
  updateCurrentUser,
} from "firebase/auth";
import Router from "next/router";
import Swal from "sweetalert2";

export const createUserWithEmail = async (email, password) => {
  const auth = getAuth();
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res?.user) {
      return res;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // errorAlert(errorCode);
    return error;
    // throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export const loginWithEmail = async (email, password) => {
  const auth = getAuth();
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res?.user) {
      return res.user;
    }
  } catch (err) {
    Swal.fire({
      text: `${err.code}`,
      icon: "error",
      confirmButtonColor: "#006eb8",
      confirmButtonText: `Ok`,
    }).then(() => {
      Router.push("/auth/login");
    });
  }
};

export const signOut = async (uid, setUser) => {
  try {
    await getAuth()
      .signOut()
      .then((res) => {
        Router.push("/auth/login");
      });
  } catch (err) {
    // throw err;
    errorAlert(err?.message);
  }
};

export const changePassword = async (currentPassword, newPassword) => {};

export const updateUser = async (updateData) => {
  const auth = getAuth()
  await updateProfile(auth.currentUser, { photoURL: null})
    .then((res) => {
      console.log("result: ", res);
      return res;
    })
    .catch((error) => {
      console.log("error: ", error);
      return error;
      // An error occurred
      // ...
    });
};
