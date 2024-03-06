import { UserContext } from "@/AuthenticApp/Context/userContext";
import OverlayLoading from "@/common/OverlayLoading";
import Login from "@/pages/auth/login";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const accessibility = [
  {
    id: 1,
    name: "Owner",
    pages: "",
  },
  {
    id: 2,
    name: "Admin",
    pages: ["Finance", "Balance"],
  },
  {
    id: 3,
    name: "HR",
    pages: ["Finance", "Balance", "Customer Bill", "CNF Bill"],
  },
  {
    id: 1,
    name: "Owner",
    pages: "all",
  },
  
]

const Page = ({ children }) => {
  const router = useRouter();
  const { user, loadingUser, setUser } = useContext(UserContext);
//   const pageName = children[0]["type"]["name"];
// console.log("pageName", pageName);
  if (loadingUser) {
    return <OverlayLoading />;
  }
  if (!isEmpty(user)) {
    return <>{children}</>;
  } else {
    return <Login />;
  }
};

export default Page;
