// import { useTheme } from "next-themes";
// import Router from "next/dist/server/router";
// import { useRouter } from "next/router";
// import { useContext, useEffect } from "react";
// import { isEmpty } from "lodash";
// import { UserContext } from "@/AuthenticApp/Context/userContext";
// import OverlayLoading from "@/common/OverlayLoading";
// import Login from "@/pages/auth/login";

// function Page({ children }) {
// //   const router = useRouter();
// //   const { user, loadingUser, setUser } = useContext(UserContext);
// //   console.log("user", user);
//   //   if (loadingUser) {
//   //     return <OverlayLoading />;
//   //   }
//   return children;
// //   if (!isEmpty(user)) {
// //     return children;
// //   } else {
// //     return <Login />;
// //   }
// }

// export default Page;

import { UserContext } from "@/AuthenticApp/Context/userContext";
import OverlayLoading from "@/common/OverlayLoading";
import Login from "@/pages/auth/login";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const Page = ({ children }) => {
  const router = useRouter();
  const { user, loadingUser, setUser } = useContext(UserContext);

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
