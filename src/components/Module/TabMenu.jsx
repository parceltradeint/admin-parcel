import Link from "next/link";
import React from "react";
import Layout from "../Layout/Layout";
import OutBound from "./OutBound";
import InBound from "./InBound";
import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const TabMenu = (props) => {
  const { tabItems } = props;

  return (
    <Layout>
      <Tab.Group>
        <Tab.List className="flex max-w-md space-x-1 rounded-xl bg-primary-50 p-1 items-center gap-6 border-b-2 border-dark-200 text-sm tracking-wide dark:border-dark-700 bg-gray-50">
          {tabItems.map((item, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                twMerge(
                  "cursor-pointer py-3 outline-none w-full rounded-lg text-sm font-medium leading-5 text-white",
                  selected ? "bg-green-600" : "text-primary-900"
                )
              }
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {tabItems.map((item, i) => (
            <Tab.Panel className="my-6" key={i}>
              {item.value}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {/* <div className=" space-y-6">
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
      </div> */}
    </Layout>
  );
};

export default TabMenu;
