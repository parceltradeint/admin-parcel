import { UserContext } from "@/AuthenticApp/Context/userContext";
import { signOut } from "@/lib/authFun/authFun";
import { Transition } from "@tailwindui/react";
import Link from "next/link";
import React, { useContext, useState } from "react";

const ProfileMenu = ({ isOpen, setIsOpen }) => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {(ref) => (
          <React.Fragment>
            <div className="fixed inset-0" onClick={() => setIsOpen(false)}>
              <div className="absolute inset-0" />
            </div>
            <div
              ref={ref}
              className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg `}
            >
              <div
                className="py-1 rounded-md bg-white shadow-xs "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <Link href="/dashboard">
                  <p
                    onClick={() => setIsOpen(false)}
                    className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                    role="menuitem"
                  >
                    My Profile
                  </p>
                </Link>

                <Link href="/auth/login">
                  <p
                    onClick={() => {
                      setUser(null);
                      signOut();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition ease-in-out duration-150"
                    role="menuitem"
                  >
                    Logout{" "}
                  </p>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
      </Transition>
    </div>
  );
};

export default ProfileMenu;
