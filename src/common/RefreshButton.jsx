import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RefreshButton = () => {
  return (
    <div>
      <span className="px-2 font-medium py-1 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
        <FontAwesomeIcon icon={faRefresh} /> Refresh
      </span>
    </div>
  );
};

export default RefreshButton;