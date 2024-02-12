import React, { useState } from "react";
import DataField from "../Shared/DataField";
import InputField from "../Shared/InputField";
import { useForm } from "react-hook-form";
import Modal from "../Module/Modal";
import { SpingSvgIcon } from "@/common/PlaceHolderLoading";
import axios from "axios";
import { errorAlert, successAlert } from "@/common/SweetAlert";

export default function UserEditForm({
  user,
  editMode,
  setUser,
  isOpen,
  setIsOpen,
}) {
  //   const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    let isExitingUser = await axios.get(`/api/user?uid=${data.uid}`);

    if (!isExitingUser.data) {
      await axios
        .post(`/api/user`, {
          ...user,
          ...data,
        })
        .then((res) => {
          successAlert("Successfully Updated");
          setUser({ ...user, ...data });
        })
        .catch((err) => {
          console.log("err", err);
          errorAlert("Something went wrong!");
        })
        .finally(() => {
          setIsOpen(false);
          setIsLoading(false);
        });
    } else {
      await axios
        .patch(`/api/user`, {
          uid: data?.uid,
          ...data,
        })
        .then((res) => {
          successAlert("Successfully Updated");
          setUser({ ...user, ...data });
        })
        .catch((err) => {
          console.log("err", err);
          errorAlert("Something went wrong!");
        })
        .finally(() => {
          setIsOpen(false);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataField
          label={"Full name"}
          value={
            <InputField
              register={register}
              required={true}
              name={"displayName"}
              defaultValue={user?.displayName || "NEED ADD NAME"}
              readOnly={!editMode}
              className={"border"}
            />
          }
          className={"my-2"}
        />
        <DataField
          label={"Email"}
          value={
            <InputField
              register={register}
              required={true}
              name={"email"}
              defaultValue={user?.email || "NEED ADD email"}
              readOnly={true}
              className={"lowercase border"}
            />
          }
          className={"my-2"}
        />
        <DataField
          label={"Phone"}
          value={
            <InputField
              register={register}
              required={true}
              name={"phoneNumber"}
              defaultValue={user?.phoneNumber || "NEED ADD Number"}
              readOnly={true}
              className={"lowercase border"}
            />
          }
          className={"my-2"}
        />
        <DataField
          label={"Gender"}
          value={
            <InputField
              register={register}
              required={true}
              name={"gender"}
              defaultValue={user?.gender || "NEED ADD gender"}
              readOnly={!editMode}
              className={"border"}
            />
          }
          className={"my-2"}
        />
        <DataField
          label={"Birthday"}
          value={
            <InputField
              register={register}
              required={true}
              name={"birthday"}
              defaultValue={user?.birthday || "NEED ADD birthday"}
              readOnly={!editMode}
              className={"border"}
            />
          }
          className={"my-2"}
        />
        <DataField
          label={"About"}
          value={
            <InputField
              register={register}
              required={true}
              name={"about"}
              defaultValue={user?.About || "NEED ADD About"}
              readOnly={!editMode}
              className={"border"}
            />
          }
          className={"my-2"}
        />

        {!editMode && (
          <div className="my-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className=" bg-primaryBg hover:opacity-75 text-white font-bold py-1 px-2 rounded mt-1 mx-auto flex justify-center uppercase"
            >
              Edit Profile
            </button>
          </div>
        )}

        {editMode && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1  flex justify-center uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" bg-primaryBg hover:opacity-75 text-white font-bold py-1 px-2 rounded mt-1 flex justify-center uppercase"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <SpingSvgIcon />
                  Updating..
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        )}
      </form>
    </>
  );
}
