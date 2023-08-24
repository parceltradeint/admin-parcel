import React from "react";
import { twMerge } from "tailwind-merge";

const DataField = ({ label, value, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col sm:flex-row bg-white dark:bg-dark-800", className
      )}
    >
      <div className="flex sm:w-2/5 items-center justify-between bg-primaryBg px-4 py-2 text-sm text-white">
        <p className="m-0 p-0">{label}</p>
        <span className="m-0 p-0">:</span>
      </div>
      <span className="flex flex-1 items-center text-sm text-black">
        {value}
      </span>
    </div>
  );
};

export default DataField;
