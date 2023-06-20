import { useRouter } from "next/router";
import React from "react";
import TabMenu from "../../components/Module/TabMenu";

const OutBoundPage = (props) => {
  const router = useRouter();

  const tabItems = [
    {
      id: 1,
      Parent: "Air Shipment",
      Child: "air-shipment",
      Position: 0,
      path: {
        as: "/outbound/air-shipment",
        href: "/outbound/[slug]",
      },
    },
    {
      id: 2,
      Parent: "Sea Shipment",
      Child: "sea-shipment",
      Position: 1,
      path: {
        as: "/outbound/sea-shipment",
        href: "/outbound/[slug]",
      },
    },
  ];

  return <TabMenu {...router} tabItems={tabItems} />;
};

export default OutBoundPage;
