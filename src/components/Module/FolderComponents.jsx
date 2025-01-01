import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../Layout/Layout";
import { errorAlert } from "@/common/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getPreviousMonths } from "@/lib/utilis";

const FolderComponents = ({ path, selectYear }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 25;
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [months, setMonths] = useState([]);
  const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth();

  // Loop through the months from the current month to January
  // for (let i = month; i >= 0; i--) {
  //   const monthName = monthNames[i];
  //   newMonths.push(monthName);
  // }
  useEffect(() => {
    const newMonths = getPreviousMonths(Number(selectYear));
    setMonths(newMonths);
  }, [selectYear]);

  return (
    <div className="flex flex-col w-full py-5 bg-gray-100">
      <div className="grid grid-cols-3 gap-4">
        {months.reverse().map((item, i) => (
          <Link
            className="flex flex-col items-center justify-center h-16 bg-gray-200 rounded"
            key={i}
            href={`${path}/${item}/?year=${selectYear}`}
          >
            <FontAwesomeIcon icon={faFolder} className="" size={"xl"} />
            <p className="mt-2 text-sm">{item}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FolderComponents;

// Define an array of month names
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



export const type = "customer-bill";
