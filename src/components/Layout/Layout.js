import React, { useState } from "react";
import Body from "./Body";
import Head from "./head";
import SideBar from "./SideBar";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavBarSection from "@/common/NavBar/NavBarSection";
import ProfileMenu from "../Module/ProfileMenu";
import { useRouter } from "next/router";
import Breadcrumb from "@/common/Breadcrumb";

function Layout(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="h-screen flex overflow-auto bg-gray-100  ">
      <Head />
      {/* Off-canvas menu for mobile */}

      <Transition show={isMenuOpen}>
        {(ref1) => (
          <div ref={ref1} className="">
            <div className="fixed inset-0 flex z-40 " style={{ zIndex: 9999 }}>
              <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {(ref) => (
                  <div
                    ref={ref}
                    className="fixed inset-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gray-800 opacity-75" />
                  </div>
                )}
              </Transition.Child>

              <Transition.Child
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                {(ref) => (
                  <div
                    ref={ref}
                    className="relative flex-1 flex flex-col max-w-[15rem] bg-white"
                  >
                    <div className="absolute top-0 right-0 -mr-14 p-1 ">
                      <button
                        className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        <svg
                          className="h-6 w-6 text-black"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <SideBar />
                  </div>
                )}
              </Transition.Child>

              <div className="flex-shrink-0 w-14">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </div>
        )}
      </Transition>

      {/* Static sidebar for desktop */}
      {/* <div
        className={`hidden ${
          router.pathname === "/bill/new/[slug]" ||
          router.pathname === "/bill/edit/[slug]"
            ? "xl:hidden"
            : "xl:flex flex-col xl:w-full xl:max-w-[16rem]"
        } `}
      >
        <div className="flex flex-col h-0 flex-1">
          <SideBar />
        </div>
      </div> */}
      <div className=" hidden xl:flex">
        <SideBar />
      </div>

      <div className="flex z-10 flex-col w-0 flex-1 overflow-hidden">
        <button
          className={`self-start inline my-2 px-4 focus:outline-none  focus:text-gray-600 ${
            router.pathname === "/bill/new/[slug]" ||
            router.pathname === "/bill/edit/[slug]"
              ? "block"
              : "xl:hidden"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="" size={"xl"} />
        </button>
        <Breadcrumb items={props.breadcrumbs} type={props.billType} />
        {/* {
          <NavBarSection
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        }
        <div className="z-10">
          <ProfileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div> */}
        <Body>{props.children}</Body>
      </div>
    </div>
  );
}

export default Layout;
