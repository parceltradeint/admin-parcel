import { Transition } from "@tailwindui/react";
import React, { useState } from "react";
import NavBar from "../common/NavBar/NavBar";
import Body from "./Body";
import Head from "./head";
function OthersLayout(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <div className="absolute inset-0 bg-gray-600 opacity-75" />
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
                    className="relative flex-1 flex flex-col max-w-[15rem]"
                  >
                    <div className="absolute top-0 right-0 -mr-14 p-1 ">
                      <button
                        className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        <svg
                          className="h-6 w-6 text-white"
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

      <div className="flex z-10 flex-col w-0 flex-1 overflow-hidden">
        {<NavBar />}
        <Body>{props.children}</Body>
      </div>
    </div>
  );
}

export default OthersLayout;
