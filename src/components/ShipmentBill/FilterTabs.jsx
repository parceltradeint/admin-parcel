import { useState } from "react";

const FilterTabs = ({ setSelectedTab, selectedTab }) => {
  const tabs = ["all", "pending", "approved", "rejected"];

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      {/* Mobile dropdown */}
      <div className="sm:hidden mb-4">
        <label htmlFor="tabs" className="sr-only">
          Select your tab
        </label>
        <select
          id="tabs"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-0.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {tabs.map((tab) => (
            <option key={tab}>{tab}</option>
          ))}
        </select>
      </div>

      {/* Desktop tab list */}
      <ul className="hidden sm:flex text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm dark:divide-gray-700 dark:text-gray-400">
        {tabs.map((tab, idx) => (
          <li key={tab} className="w-full focus-within:z-10">
            <button
              onClick={() => setSelectedTab(tab)}
              className={`inline-block w-full p-2 border-r border-gray-200 
                dark:border-gray-700 focus:ring-4 focus:outline-none uppercase
                ${
                  selectedTab === tab
                    ? "text-white bg-green-500 dark:bg-gray-700 dark:text-white"
                    : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:hover:text-white dark:hover:bg-gray-700"
                }
                ${idx === 0 ? "rounded-s-lg" : ""}
                ${idx === tabs.length - 1 ? "rounded-e-lg border-r-0" : ""}
              `}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Content example */}
      {/* <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <p className="text-gray-800 dark:text-gray-100">
          You selected: <strong>{selectedTab}</strong>
        </p>
      </div> */}
    </div>
  );
};

export default FilterTabs;
