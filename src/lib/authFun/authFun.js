import { fbAuth } from "@/AuthenticApp/Config/firebase-config";
import { successAlert } from "@/common/SweetAlert";
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

export const changePassword = async (currentPassword, newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential)
    .then((res) => {
      updatePassword(user, newPassword)
        .then((res) => {
          successAlert("Successfully updated your password.");
        })
        .catch((err) => {
          if (err.code === "auth/weak-password") {
            errorAlert(
              "Weak Password! Password should be at least 6 characters."
            );
          } else {
            errorAlert("Something went wrong. Please try again later.");
          }
        });
    })
    .catch((err) => {
      if (err.code === "auth/wrong-password") {
        errorAlert(
          "Invalid your current password. Please check your current password."
        );
      } else {
        errorAlert("Something went wrong. Please try again later.");
      }
    });
  return true;
};

export const updateUser = async (updateData) => {
  const auth = getAuth();
  await updateProfile(auth.currentUser, { displayName: updateData.displayName, photoURL: updateData.photoURL})
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


export const sendResetPasswordLink = async (email) => {
  const auth = getAuth();
  return await sendPasswordResetEmail(auth, email);
};

export const LoginAsUser = async (token) => {
  const auth = getAuth();
  try {
    return await signInWithCustomToken(auth, token);
  } catch (err) {
    throw err;
  }
};