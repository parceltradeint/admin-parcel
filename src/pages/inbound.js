import { useRouter } from "next/router";
import React from "react";
import InBound from "@/components/Module/InBound";
import TabMenu from "@/components/Module/TabMenu";

const InBoundPage = (props) => {
  const router = useRouter();

  const tabItems = [
    {
      id: 1,
      label: "Air Shipment",
      value: <InBound type={"Air"} />,
    },
    {
      id: 2,
      label: "Sea Shipment",
      value: <InBound type={"Sea"} />,
    },
  ];

  return <TabMenu {...router} tabItems={tabItems} />;
};

export default InBoundPage;
