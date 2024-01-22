import React from "react";
import Section from "./Section";
const PlaceHolderLoading = ({ loading, error }) => {
  if (!!loading) {
    return (
      <div className="   text-center py-12 w-full my-auto">
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 cursor-not-allowed"
            disabled
          >
            <SpingSvgIcon /> Processing
          </button>
        </span>
      </div>
    );
  }

  if (!!error) {
    return (
      <Section>
        <div className=" border-gray-400 bg-white text-center p-4 py-12">
          <span className="inline-flex rounded-md">
            Data Not found. Please check your internet collections or try some
            times later.
          </span>
        </div>
      </Section>
    );
  }

  return <div />;
};

export default PlaceHolderLoading;

export const SpingSvgIcon = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
