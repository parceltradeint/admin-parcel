import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OverlayLoading from "@/common/OverlayLoading";
import { loginWithEmail } from "@/lib/authFun/authFun";

const Login = () => {
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
    const { email, password } = data;
    await loginWithEmail(email, password)
      .then((res) => {
        Router.push("/");
        setProcessing(false);
      })
      .catch((err) => {
        setProcessing(false);
        Swal.fire({
          text: `${err.code}`,
          icon: "error",
          confirmButtonColor: "#006eb8",
          confirmButtonText: `Ok`,
          // timerProgressBar: true,
        }).then((res) => {
          Router.push("/auth/login");
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
            Parcel Admin Dashboard
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
                } appearance-none block w-full px-3 py-2 xl:py-3 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:text-eBlue focus:border-eBlue transition duration-150 ease-in-out text-base  placeholder-placeHolderColor xl:flex itms-center `}
              />
              {errors.email && (
                <p className="block text-m py-1 text-errorColor">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-4 rounded-md relative">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800  "
                >
                  Password
                </label>
                {/* <Link href="/auth/forget-password" passHref>
                  <span className="text-xs text-gray-600 dark:text-gray-400 hover:underline">
                    Forget Password?
                  </span>
                </Link> */}
              </div>

              <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <span>
                    <FontAwesomeIcon
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className="cursor-pointer text-grayButtonBorder"
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </span>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "The password field is required.",
                  })}
                  className={`${
                    errors.password
                      ? "border border-errorColor"
                      : "border border-eLightGray"
                  } appearance-none block w-full px-3 py-2 xl:py-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:text-eBlue focus:border-eBlue transition duration-150 ease-in-out text-base  placeholder-placeHolderColor xl:flex itms-center `}
                />
              </div>

              {errors.password && (
                <p className="block text-m py-1 text-errorColor">
                  This field is required
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={!isValid}
                className={`${
                  !isValid ? " cursor-not-allowed" : "cursor-pointer "
                } w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600`}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
