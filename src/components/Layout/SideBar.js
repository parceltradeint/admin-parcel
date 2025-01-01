import { faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faAd,
  faAirFreshener,
  faBoxesPacking,
  faBriefcase,
  faBullhorn,
  faCheckCircle,
  faCircleInfo,
  faCirclePlus,
  faCoins,
  faDashboard,
  faDatabase,
  faDonate,
  faFlag,
  faGift,
  faMoneyBills,
  faMoneyBillTransfer,
  faSearch,
  faShop,
  faShoppingBag,
  faSortAmountAsc,
  faTasks,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Avatar } from "../../assets/icons";
import { UserContext } from "@/AuthenticApp/Context/userContext";
import Modal from "../Module/Modal";
import DataField from "../Shared/DataField";
import InputField from "../Shared/InputField";
import NoticeForm from "../FormSegment/NoticeForm";
import { signOut } from "@/lib/authFun/authFun";
// import { UserContext } from "../../AuthenticationApp/Context/userContext";

const SideBar = () => {
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const { user } = useContext(UserContext);
  let type = router?.query?.type;
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    type = urlParams.get("type") || router?.query?.type;
  }

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  return (
    <>
      <div
        className={`scrollbar overflow-auto h-screen bg-[beige] text-green-600 py-1`}
      >
        <div className="hidden lg:block">
          <p className="font-bold text-2xl text-center text-black">
            <span>
              P<span className="text-red-600">ARCE</span>L
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center mt-6 -mx-2">
          <Avatar />
          <h4 className="mx-2 mt-2 font-medium text-gray-800 hover:underline">
            {user?.displayName || "Name"}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-sideBarText hover:underline">
            {user?.email || "Email"}
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => signOut()}
            className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 mx-auto flex justify-center uppercase"
          >
            Logout
          </button>
        </div>

        <div className="">
          <nav className="">
            <Link
              as={"/my-profile"}
              href={{
                pathname: "/my-profile",
              }}
              className={`${
                pathname === "/my-profile"
                  ? "bg-sideBarMenuBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarMenuBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faUserCircle} />
                <span className="mx-4 font-medium">My Profile</span>
              </div>
            </Link>
            {user?.access.map((item, i) => (
              <Link
                as={item.link}
                href={{
                  pathname: item.link,
                }}
                key={i}
                className={`${
                  asPath.includes(item.link?.replace(/months/g, "month"))
                    ? "bg-sideBarMenuBg  text-sideBarHoverText "
                    : "text-sideBarText  "
                } flex items-center px-4 py-2 md:mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
              >
                <div>
                  <FontAwesomeIcon icon={item.icon} />
                  <span className="mx-4 font-medium">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* <NoticeForm
        isNoticeOpen={isNoticeOpen}
        setIsNoticeOpen={setIsNoticeOpen}
      /> */}
    </>
  );
};

export default SideBar;
