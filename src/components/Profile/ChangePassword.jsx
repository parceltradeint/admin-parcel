import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import Section from "@/common/Section";
import { changePassword } from "@/lib/authFun/authFun";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handlePassword = async (data) => {
    if (!window.confirm("Are you confirm change your password?")) {
      return
    }
    setLoading(true);
    await changePassword(data.current_password, data.password);
    setLoading(false);
  };
  if (loading) {
    return <PlaceHolderLoading loading={loading} />;
  }
  return (
    <Section>
      <form onSubmit={handleSubmit(handlePassword)}>
        <p className="text-primaryText text-lg">
          Accout Password{" "}
          <span className=" text-errorColor">
            (Please carefully update your password)
          </span>
        </p>

        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="current_password"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Current Password
            </label>
            <input
              {...register("current_password", {
                required: true,
              })}
              name="current_password"
              placeholder="Enter your current password"
              type={showPassword ? "text" : "password"}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              New Password
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              name="password"
              onChange={(e) => setConfirmPassword("")}
              placeholder="Enter your new password"
              type={showPassword ? "text" : "password"}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              minLength={"6"}
            />
            {errors.password && (
              <>
                {errors.password.type === "minLength" && (
                  <p className="text-errorColor font-medium text-sm">
                    {"Please enter at least 6 character"}
                  </p>
                )}
              </>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Confirm Password
            </label>
            <input
              placeholder="Enter your confirm password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword?.length > 0
              ? confirmPassword !== watch("password") && (
                  <p className="block text-m py-1 text-errorColor">
                    {"Don't match your password"}
                  </p>
                )
              : null}
          </div>
        </div>

        <div className="cursor-pointer label justify-start space-x-2">
          <input
            type="checkbox"
            id="show_password"
            className="checkbox checkbox-accent checkbox-sm"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="label-text" htmlFor="show_password">
            Show Password
          </label>
        </div>
        <button
          type="submit"
          disabled={watch("password") != confirmPassword || !isValid}
          className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 mx-auto flex justify-center uppercase"
        >
          Change Password
        </button>
      </form>
    </Section>
  );
};

export default ChangePassword;
