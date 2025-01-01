import React, { useState, useRef, useEffect } from "react";

const YearPicker = ({ onSelectYear, setPickerOpen, selectYear }) => {
  const currentYear = new Date().getFullYear();
  const currentDecade = currentYear - (currentYear % 10);
  const [visibleDecade, setVisibleDecade] = useState(currentDecade);
  const pickerRef = useRef(null);

  const generateYears = (decade) => {
    return Array.from({ length: 12 }, (_, i) => decade - 1 + i);
  };

  const handlePrevDecade = () => {
    setVisibleDecade(visibleDecade - 10);
  };

  const handleNextDecade = () => {
    if (visibleDecade + 10 <= currentDecade) {
      setVisibleDecade(visibleDecade + 10);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef, setPickerOpen]);

  return (
    <div
      ref={pickerRef}
      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
    >
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevDecade} className="text-xl">
            ←
          </button>
          <strong>
            {visibleDecade}-{visibleDecade + 9}
          </strong>
          <button
            onClick={handleNextDecade}
            className={`text-xl ${
              visibleDecade >= currentDecade
                ? " cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={visibleDecade >= currentDecade}
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {generateYears(visibleDecade).map((year) => (
            <button
              key={year}
              className={`px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white ${
                year > currentYear
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-500 hover:text-white"
              } ${
                year === selectYear ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
              onClick={() => {
                if (year <= currentYear) {
                  onSelectYear(Number(year));
                  setPickerOpen(false);
                }
              }}
              disabled={year > currentYear}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearPicker;
