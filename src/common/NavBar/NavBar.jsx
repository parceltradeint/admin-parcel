import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useState } from "react";
import { Avatar } from "../../../assets/icons";
import { UserContext } from "../../../AuthenticationApp/Context/userContext";
import { signOut } from "../../../lib/authfb";

const NavBar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const desktopNavStyle =
    "my-5 mx-auto cursor-pointer px-4 font-medium py-1 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 ml-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80  leading-5 focus:outline-none transition duration-150 ease-in-out";

  return (
    <header className="bg-gray-300">
      <div className="mx-auto px-2 xl:divide-y xl:divide-gray-200 xl:px-8">
        <div className="relative h-12 flex justify-between">
          <div className="relative z-10 px-2 flex xl:px-0">
          </div>

          <div className="relative z-10 flex items-center xl:hidden lg:hidden md:hidden">
            {/* Mobile menu button */}
            <button
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <FontAwesomeIcon icon={faBars} className="" size={"xl"} />
            </button>
          </div>

          <div className="hidden xl:relative xl:ml-4 lg:relative md:relative lg:ml-4 xl:flex lg:flex md:flex lg:items-center xl:items-center md:items-center">
            {user ? (
              <>
                <Link href="/" passHref>
                  <p className={desktopNavStyle}>Home</p>
                </Link>
                <div className="ml-4 relative flex-shrink-0 z-30">
                  <div>
                    <button
                      className="bg-white rounded-full w-8 h-8 flex focus:outline-none ring-2 ring-offset-2 ring-indigo-500 focus:ring-indigo-800"
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={() =>
                        setIsProfileDropdownOpen(!isProfileDropdownOpen)
                      }
                    >
                      <span className="sr-only">Open user menu</span>
                      {user?.photoURL ? (
                        <Image
                          src={user?.photoURL}
                          className="object-cover mx-2 rounded-full"
                          width={35}
                          height={35}
                          alt={user?.displayName?.charAt(0) || "P"}
                        />
                      ) : (
                        <Avatar height={"30"} />
                      )}
                    </button>
                  </div>
                  {/* Profile dropdown panel, show/hide based on dropdown state. */}
                  <div
                    className={`${
                      isProfileDropdownOpen ? "block" : "hidden"
                    } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-30`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      as={"/user/" + user?.userId}
                      href={{
                        pathname: "/user/[slug]",
                        // query: { phase: item.phase },
                      }}
                      passHref
                    >
                      <p
                        onClick={() =>
                          setIsProfileDropdownOpen(!isProfileDropdownOpen)
                        }
                        className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        My Profile
                      </p>
                    </Link>
                    <Link href="/jobs">
                      <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                        Jobs
                      </a>
                    </Link>
                    <div
                      onClick={() => {
                        setIsProfileDropdownOpen(!isProfileDropdownOpen);
                        signOut(user?.uid);
                      }}
                      className=" block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                    >
                      Sign out
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/" passHref>
                  <p className={desktopNavStyle}>Home</p>
                </Link>
                <Link href="/auth/login" passHref>
                  <p className={desktopNavStyle}>Login</p>
                </Link>
                <Link href="/auth/register" passHref>
                  <p className={desktopNavStyle}>Register</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu, toggle classes based on menu state.*/}
      <nav
        className={`${
          isMenuOpen ? "block absolute bg-amber-50 w-full " : "hidden"
        }`}
        aria-label="Global"
      >
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="mt-3 space-y-1">
            <Link href="/">
              <a
                className={`block px-4 py-2 text-lg text-eDeepGray focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
              ${
                router.pathname === "/"
                  ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                  : "border-transparent pl-6 xl:pl-4"
              }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </Link>
            {user ? (
              <>
                <Link
                  as={"/user/" + user?.userId}
                  href={{
                    pathname: "/user/[slug]",
                  }}
                  passHref
                >
                  <a
                    className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
              ${
                router.pathname === "/user/[slug]"
                  ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                  : "border-transparent pl-6 xl:pl-4"
              }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </a>
                </Link>
                <Link href="/jobs">
                  <a
                    className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
              ${
                router.pathname === "/jobs"
                  ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                  : "border-transparent pl-6 xl:pl-4"
              }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobs
                  </a>
                </Link>
                <a
                  className="hover:bg-gray-300 cursor-pointer mt-1 block px-4 pl-6 xl:pl-4 py-2 text-lg text-eDeepGray hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setIsMenuOpen(false);
                    signOut(user?.uid);
                  }}
                >
                  Sign out
                </a>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <a
                    className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray hover:text-indigo-700 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
                    ${
                      router.pathname === "/auth/login"
                        ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                        : "border-transparent pl-6 xl:pl-4"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </a>
                </Link>
                <Link href="/auth/register">
                  <a
                    className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray hover:text-indigo-700 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
                    ${
                      router.pathname === "/auth/register"
                        ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                        : "border-transparent pl-6 xl:pl-4"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
