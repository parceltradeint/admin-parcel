import Layout from "@/components/Layout/Layout";
import FolderComponents from "@/components/Module/FolderComponents";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const months = [
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

const MonthsPage = ({ type }) => {
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());

  return (
    <Layout billType={type}>
      <div className="flex flex-row items-center justify-center space-x-3 w-full py-2 bg-gray-100 mb-2">
        <label
          for="year"
          className=" text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Year-
        </label>
        <select
          id="year"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 px-5 py-1 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectYear}
          onChange={(e) => setSelectYear(e.target.value)}
        >
          <option value={"2024"}>2024</option>
          <option value={"2023"}>2023</option>
          <option value={"2022"}>2022</option>
        </select>
      </div>

      <FolderComponents path={`/bills/${type}/month`} selectYear={selectYear} />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { type: "customer" } },
      { params: { type: "cnf" } },
      { params: { type: "packing" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { type: params.type } };
}

export default MonthsPage;
