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
    
      <Tab.Group>
        <Tab.List className="mx-auto flex max-w-md space-x-1 rounded-xl bg-primary-50 p-1 items-center gap-6 border-b-2 border-dark-200 text-sm tracking-wide dark:border-dark-700 bg-gray-50">
          {tabItems.map((item, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                twMerge(
                  "cursor-pointer py-3 outline-none w-full rounded-lg text-sm font-medium leading-5 text-white uppercase",
                  selected ? "bg-green-600" : "text-primary-900 bg-green-200"
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
  );
};

export default TabMenu;
