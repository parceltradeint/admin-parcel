import Image from "next/image";
import React from "react";
const LogoImage = (props) => {
  return (
    <Image
      src={"/otul-main-logo.svg"}
      alt="OtulJob"
      layout="fixed"
      width={240}
      height={55}
    />
  );
};

export default LogoImage;
