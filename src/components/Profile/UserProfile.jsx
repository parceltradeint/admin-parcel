import {
  faBriefcase,
  faCamera,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmpty, sumBy } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { UserContext } from "@/AuthenticApp/Context/userContext";
import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import Image from "next/image";
import { Avatar } from "@/assets/icons";
import { fileToDataUri } from "@/lib/utilis";
import ChangePassword from "./ChangePassword";
import { updateUser } from "@/lib/authFun/authFun";
import Modal from "../Module/Modal";

const UserProfilePage = (props) => {
  const { userId } = props;
  const { user, loadingUser } = useContext(UserContext);
  const [profileURL, setProfileURL] = useState("");
  const [profileFile, setProfileFile] = useState("");
  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [btnTrue, setBtnTrue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUploadProfileChange = (file) => {
    if (!file) {
      setProfileURL("");
      setBtnTrue(false);
      return;
    }
    setProfileFile(file);
    fileToDataUri(file).then((profileURL) => {
      setProfileURL(profileURL);
      setBtnTrue(true);
    });
  };

  const handleUploadProfile = async () => {
    setProfileImageLoading(true);
    await updateUser({ photoURL: profileURL })
      .then((res) => {
        console.log("res", res);
        //   setProfileURL(res.photoURL);
      })
      .catch((err) => {
        console.log("err", err);
      });
    setProfileImageLoading(false);
    setBtnTrue(false);
  };

  return (
    <>
      {loadingUser ? (
        <PlaceHolderLoading loading={loadingUser} />
      ) : (
        <>
          <div class=" w-full gap-6 flex items-center justify-center my-3">
            <div class="w-full bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
              <div class="flex items-center gap-4">
                <span className=" cursor-pointer relative">
                  {profileURL ? (
                    <Image
                      src={profileURL}
                      // className="object-cover w-24 h-24 mx-2 rounded-full"
                      width={96}
                      height={96}
                      alt={user?.displayName?.charAt(0) || "P"}
                      className=" cursor-pointer w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                    />
                  ) : (
                    <Avatar height={"140"} width={"140"} />
                  )}
                  <div className=" absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center opacity-0 hover:opacity-75 bg-gray-500 cursor-pointer w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform">
                    <label htmlFor="profile_pic">
                      <div className=" flex flex-col items-center justify-center cursor-pointer text-black opacity-100">
                        <FontAwesomeIcon icon={faCamera} size="2xl" />
                      </div>
                    </label>
                    <input
                      accept=".jpg, .png, .jpeg"
                      type="file"
                      id="profile_pic"
                      className=" hidden"
                      onChange={(event) =>
                        handleUploadProfileChange(event.target.files[0] || null)
                      }
                    />
                  </div>
                  {btnTrue && (
                    <button
                      type="button"
                      onClick={handleUploadProfile}
                      disabled={!btnTrue}
                      className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 mx-auto flex justify-center uppercase"
                    >
                      Update
                    </button>
                  )}
                </span>

                <div class="w-fit transition-all transform duration-500">
                  <h1 class="text-gray-600 dark:text-gray-200 font-bold">
                    {user?.displayName || "Name"}
                  </h1>
                  <p class="text-gray-600">
                    ROLE-{" "}
                    {user?.customClaims ? user?.customClaims["role"] : "Admin"}
                  </p>
                  <p class="text-gray-600">{user?.email || "Email"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-100 shadow overflow-hidden sm:rounded-lg mb-3">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User BIO
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details and informations about user.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.displayName || "Name"}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.email || "Name"}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.customClaims ? user?.customClaims["gender"] : "MALE"}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    DATE OF BIRTH
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.customClaims
                      ? user?.customClaims["birthday"]
                      : "1-2-33"}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">About</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To get social media testimonials like these, keep your
                    customers engaged with your social media accounts by posting
                    regularly yourself
                  </dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 mx-auto flex justify-center uppercase"
            >
              Edit Profile
            </button>
          </div>

          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} showXButton>
            <Modal.Title>User Update section</Modal.Title>
            <Modal.Content>
              <div className="w-full bg-gray-100 shadow overflow-hidden sm:rounded-lg mb-3">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User BIO
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and informations about user.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.displayName || "Name"}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.email || "Name"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Gender
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.customClaims
                          ? user?.customClaims["gender"]
                          : "MALE"}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        DATE OF BIRTH
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.customClaims
                          ? user?.customClaims["birthday"]
                          : "1-2-33"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your
                        customers engaged with your social media accounts by
                        posting regularly yourself
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Modal.Content>
            <Modal.Footer>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 mx-auto flex justify-center uppercase"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 mx-auto flex justify-center uppercase"
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>

          <ChangePassword />
        </>
      )}
    </>
  );
};

export default UserProfilePage;
