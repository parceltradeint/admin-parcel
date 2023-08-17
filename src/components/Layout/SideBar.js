import { faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faAd,
  faAirFreshener,
  faBriefcase,
  faCheckCircle,
  faCircleInfo,
  faCirclePlus,
  faDashboard,
  faDatabase,
  faDonate,
  faGift,
  faMoneyBills,
  faMoneyBillTransfer,
  faSearch,
  faShop,
  faShoppingBag,
  faTasks,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Avatar } from "../../assets/icons";
import { UserContext } from "@/AuthenticApp/Context/userContext";
// import { UserContext } from "../../AuthenticationApp/Context/userContext";

const SideBar = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { user } = useContext(UserContext);
  let type = router?.query?.type;
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    type = urlParams.get("type") || router?.query?.type;
  }
  return (
    <>
      <div
        className={`scrollbar  h-screen overflow-y-auto overflow-x-hidden bg-[beige] text-green-600 py-1`}
      >
        <div className="hidden lg:block">
          <p className="font-bold text-2xl text-center">
            <span className="text-[#ff2626]">Parcel</span>{" "}
            <span className="text-[#fd9900]">.Com</span>
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

        <div className="">
          <nav className="">
            <Link
              as={"/"}
              href={{
                pathname: "/dashboard",
              }}
              className={`${
                pathname === "/user/[slug]"
                  ? "bg-sideBarBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faUserCircle} />
                <span className="mx-4 font-medium">My Profile</span>
              </div>
            </Link>
            <Link
              as={"/dashboard"}
              href={{
                pathname: "/dashboard",
              }}
              className={`${
                pathname === "/dashboard"
                  ? "bg-sideBarHoverBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faDashboard} />
                <span className="mx-4 font-medium">Dashboard</span>
              </div>
            </Link>

            <Link
              // as={"/outbound"}
              // href={{
              //   pathname: "/outbound",
              // }}
              href={`/bills/customer/months`}
              className={`${
                query?.type === "customer" || pathname === "/bills/customer/months"
                  ? "bg-sideBarHoverBg  text-sideBarHoverText"
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faShop} />
                <span className="mx-4 font-medium">Customer Bill</span>
              </div>
            </Link>

            <Link
              href={`/bills/cnf/months`}
              className={`${
                pathname === "/bills/cnf/months" || 
                query?.type === "cnf"
                  ? "bg-sideBarHoverBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faShop} />
                <span className="mx-4 font-medium">CnF Bill</span>
              </div>
            </Link>

            <Link
              as={"/"}
              href={{
                pathname: "/",
              }}
              className={`${
                pathname === "/shipment"
                  ? "bg-sideBarBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faAirFreshener} />
                <span className="mx-4 font-medium">Shipment</span>
              </div>
            </Link>
            <Link
              as={"/customers"}
              href={{
                pathname: "/customers",
              }}
              className={`${
                pathname === "/customers"
                  ? "bg-sideBarHoverBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faUsers} />
                <span className="mx-4 font-medium">Customer</span>
              </div>
            </Link>

            <Link
              as={"/"}
              href={{
                pathname: "/",
              }}
              className={`${
                pathname === "/"
                  ? "bg-sideBarBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faUsers} />
                <span className="mx-4 font-medium">Finance</span>
              </div>
            </Link>

            <Link
              as={"/"}
              href={{
                pathname: "/",
              }}
              className={`${
                pathname === "/"
                  ? "bg-sideBarBg  text-sideBarHoverText "
                  : "text-sideBarText  "
              } flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform  hover:bg-sideBarHoverBg   hover:text-sideBarHoverText`}
            >
              <div>
                <FontAwesomeIcon icon={faDatabase} />
                <span className="mx-4 font-medium">Admin Dashboard</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
