import { UserContext } from "@/AuthenticApp/Context/userContext";
import { isAccessModule } from "@/common/AccessLevel";
import OverlayLoading from "@/common/OverlayLoading";
import Layout from "@/components/Layout/Layout";
import FolderComponents from "@/components/Module/FolderComponents";
import YearPicker from "@/components/Module/YearPicker";
import { getLastTenYears } from "@/lib/utilis";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
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
  const { user, loadingUser } = useContext(UserContext);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const router = useRouter();
  if (loadingUser) {
    return <OverlayLoading />;
  }

  if (!isAccessModule(user.access, `/bills/${type}/months`)) {
    router.push("/403");
  }
  return (
    <Layout billType={type}>
      <div className="flex flex-row items-center justify-center space-x-3 w-auto py-2 bg-gray-100 mb-2">
        <label
          for="year"
          className=" text-sm font-medium text-gray-900 dark:text-white"
        >
          Selected Year-
        </label>
        <div className="relative inline-block text-left">
          <span
            className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 px-5 py-1 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex items-center"
            onClick={() => setPickerOpen(true)}
          >
            {selectYear}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
          {isPickerOpen && (
            <YearPicker
              onSelectYear={setSelectYear}
              onClose={() => setPickerOpen(false)}
              setPickerOpen={setPickerOpen}
              selectYear={selectYear}
            />
          )}
        </div>
      </div>

      <FolderComponents
        path={`/bills/${type}/month`}
        selectYear={selectYear}
        key={selectYear}
      />
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
