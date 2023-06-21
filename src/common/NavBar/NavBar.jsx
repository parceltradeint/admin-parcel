import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useState } from "react";

const NavBar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const desktopNavStyle =
    "my-5 mx-auto cursor-pointer px-4 font-medium py-1 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 ml-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80  leading-5 focus:outline-none transition duration-150 ease-in-out";

  return (
    <header className="bg-gray-200">
      <div className="mx-auto px-2 xl:divide-y xl:divide-gray-200 xl:px-8">
        <div className="relative h-12 flex justify-between">
          <div className="relative z-10 px-2 flex xl:px-0">
            <p className="text-xl text-black font-semibold flex items-center">Parcel Export Import</p>
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
            <Link href="/" passHref>
              <p className={desktopNavStyle}>Home</p>
            </Link>
            <Link href="#services" passHref>
              <p className={desktopNavStyle}>Services</p>
            </Link>
            <Link href="#testimonials" passHref>
              <p className={desktopNavStyle}>Testimonials</p>
            </Link>
            
            <Link href="#" passHref>
              <p className={desktopNavStyle}>Shop</p>
            </Link>
            <Link href="#contact" passHref>
              <p className={desktopNavStyle}>Contact</p>
            </Link>
            <Link href="/dashboard" passHref>
              <p className={desktopNavStyle}>Dashboard</p>
            </Link>
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
              <p
                className={`block px-4 py-2 text-lg text-eDeepGray focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
              ${
                router.pathname === "/"
                  ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                  : "border-transparent pl-6 xl:pl-4"
              }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </p>
            </Link>
            <>
              <Link href="/services">
                <p
                  className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray hover:text-indigo-700 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
                    ${
                      router.pathname === "/services"
                        ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                        : "border-transparent pl-6 xl:pl-4"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </p>
              </Link>
              <Link href="#testimonials">
                <p
                  className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray hover:text-indigo-700 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
                    ${
                      router.pathname === "#testimonials"
                        ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                        : "border-transparent pl-6 xl:pl-4"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </p>
              </Link>
              <Link href="#">
                <p
                  className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray hover:text-indigo-700 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
                    ${
                      router.pathname === "/shop"
                        ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                        : "border-transparent pl-6 xl:pl-4"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </p>
              </Link>
              <Link href="#contact">
                <p
                  className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray hover:text-indigo-700 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
                    ${
                      router.pathname === "#contact"
                        ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                        : "border-transparent pl-6 xl:pl-4"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </p>
              </Link>
              <Link href="/dashboard">
                <p
                  className={`hover:bg-gray-300 block px-4 py-2 text-lg text-eDeepGray hover:text-indigo-700 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out
                    ${
                      router.pathname === "/dashboard"
                        ? "border-l-8 border-eBlue bg-exploreSelectionBg xl:bg-transparent pl-4"
                        : "border-transparent pl-6 xl:pl-4"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </p>
              </Link>
            </>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
