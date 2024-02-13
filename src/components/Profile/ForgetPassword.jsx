import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import OverlayLoading from "../../components/common/OverlayLoading";
import {
  loginWithEmail,
  loginWithGoogle,
  sendResetPasswordLink,
} from "../../lib/authfb";

const ForgetPassword = () => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    setProcessing(true);
    const { email } = data;
    await sendResetPasswordLink(email)
      .then((res) => {
        setProcessing(false);
        Swal.fire({
          text: "Your password reset instructions have been sent to your email",
          icon: "success",
          confirmButtonColor: "#006EB8",
          confirmButtonText: "Take me to the login screen",
        }).then(() => {
          Router.push("/?page=login");
        });
      })
      .catch((err) => {
        setProcessing(false);
        console.log("err", err);
        Swal.fire({
          text: `${err.code}`,
          icon: "error",
          confirmButtonColor: "#006eb8",
          confirmButtonText: `Ok`,
          timerProgressBar: true,
        });
      });
  };

  if (processing) {
    return <OverlayLoading />;
  }
  return (
    <>
      <div className="bg-gray-100 p-8">
        <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
            Otul-Job
          </h1>

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="userId"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                // {...register("email", { required: true})}
                placeholder="Enter your email address"
                {...register("email", {
                  required: "The email field is required.",
                  pattern: {
                    value:
                      /^([\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@((((([a-z0-9]{1}[a-z0-9-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?)$/,
                    message: "Please enter a valid email.",
                  },
                })}
                className={`${
                  errors.email
                    ? "border border-errorColor"
                    : "border border-eLightGray"
                } appearance-none block w-full px-3 py-2 xl:py-3 border border-gray-300 rounded-md focus:outline-none focus:text-eBlue focus:border-eBlue transition duration-150 ease-in-out text-base  placeholder-placeHolderColor xl:flex itms-center text-eDeepGray`}
              />
              {errors.email && (
                <p className="block text-m py-1 text-errorColor">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={!isValid}
                className={`${
                  !isValid ? " cursor-not-allowed" : "cursor-pointer "
                } w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600`}
              >
                Forget Your Password
              </button>
            </div>
          </form>

          <Link href="/auth/login">
            <a
              className={`block px-4 py-2 text-lg text-eDeepGray focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
              ${
                router.pathname === "/auth/login"
                  ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                  : "border-transparent pl-6 xl:pl-4"
              }`}
            >
              <p className="mt-8 text-xs font-light text-center text-gray-400">
                Already have an account?
                <a
                  href="#"
                  className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                >
                  {" "}
                  Login
                </a>
              </p>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;