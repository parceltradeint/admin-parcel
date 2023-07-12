import { useRouter } from "next/router";
import React from "react";
import OutBound from "@/components/Module/OutBound";
import TabMenu from "@/components/Module/TabMenu";

const OutBoundPage = (props) => {
  const router = useRouter();

  const tabItems = [
    {
      id: 1,
      label: "Air Shipment",
      value: <OutBound type={"Air"} />,
    },
    {
      id: 2,
      label: "Sea Shipment",
      value: <OutBound type={"Sea"} />,
    },
  ];

  return <TabMenu {...router} tabItems={tabItems} />;
};

export default OutBoundPage;