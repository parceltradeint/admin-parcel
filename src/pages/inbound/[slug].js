import { useRouter } from "next/router";
import React from "react";
import TabMenu from "../../components/Module/TabMenu";

const InBoundPage = (props) => {
  const router = useRouter();

  const tabItems = [
    {
      id: 1,
      Parent: "Air Shipment",
      Child: "air-shipment",
      Position: 0,
      path: {
        as: "/inbound/air-shipment",
        href: "/inbound/[slug]",
      },
    },
    {
      id: 2,
      Parent: "Sea Shipment",
      Child: "sea-shipment",
      Position: 1,
      path: {
        as: "/inbound/sea-shipment",
        href: "/inbound/[slug]",
      },
    },
  ];

  return <TabMenu {...router} tabItems={tabItems} />;
};

export default InBoundPage;
