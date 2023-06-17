import React, { useContext } from "react";
import HeaderInfo from "./HeaderInfo";
// import { Engagespot } from "@engagespot/react-component";
// import { UserContext } from "../../../AuthenticationApp/Context/userContext";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Avatar } from "@/assets/icons";
const NavBarSection = (props) => {
  const { isMenuOpen, setIsMenuOpen, setIsOpen, isOpen } = props;
  // const { user } = useContext(UserContext);
  return (
    <div className="bg-gradient-to-r from-[#b6b6b6] via-[#ffff] to-[#e99594]">
      <div className="navbar">
        <div className="navbar-start">
          {/* <button
            className="xl:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none  focus:text-gray-600 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="text-white" size={"xl"} />
          </button> */}

          <div className="navbar-center flex items-center md:justify-center space-x-1 py-3">
            <button
              className="self-start xl:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none  focus:text-gray-600 flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon
                icon={faBars}
                className="text-white"
                size={"xl"}
              />
            </button>
            <span className="flex space-x-2 items-center border-2  border-emerald-800 px-2 rounded-md animate-bounce">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f5365c]">
                <span className="animate-ping inline-flex h-full w-full rounded-full bg-[#ed274f] opacity-75"></span>
              </span>
              <div className=" text-[#f5365c] first-letter:uppercase">
                {"Is Employee"}
              </div>
            </span>
            <div>
              <p className="font-bold text-2xl">
                <span className="text-[#ff2626]">Parcel</span>{" "}
                <span className="text-[#fd9900]">.Com</span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                <Avatar />
              </div>
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default NavBarSection;
