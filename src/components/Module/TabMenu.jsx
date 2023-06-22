import Link from "next/link";
import React from "react";
import Layout from "../Layout/Layout";
import OutBound from "./OutBound";
import InBound from "./InBound";

const TabMenu = (props) => {
  const { tabItems } = props;

  return (
    <Layout>
      <div className=" space-y-6">
        <div className="tabs tabs-boxed bg-gray-100 justify-center space-x-6">
          {tabItems.map((item, index) => {
            return (
              <Link {...item.path} key={index}>
                <p
                  className={`${
                    item.path.as === props.asPath ? "tab-active" : ""
                  } tab text-sideBarText font-semibold bg-gr`}
                >
                  {item?.Parent}
                </p>
              </Link>
            );
          })}
        </div>
        {props.asPath === "/outbound/air-shipment" && (
          <OutBound type={"By Air"} />
        )}
        {props.asPath === "/outbound/sea-shipment" && (
          <OutBound type={"By Sea"} />
        )}
        {props.asPath === "/inbound/air-shipment" && (
          <InBound type={"By Air"} />
        )}
        {props.asPath === "/inbound/sea-shipment" && (
          <InBound type={"By Sea"} />
        )}
      </div>
    </Layout>
  );
};

export default TabMenu;
