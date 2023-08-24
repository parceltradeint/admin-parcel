import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import { errorAlert } from "@/common/SweetAlert";
import CustomerForm from "@/components/FormSegment/CustomerForm";
import Layout from "@/components/Layout/Layout";
import CustomerGrid from "@/components/Module/Customers/CustomerGrid";
import Modal from "@/components/Module/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Customers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  // const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const quotesPerPage = 25;
  const pagesVisited = pageNumber * quotesPerPage;
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const pagginationHandler = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleSearch = async (search) => {
    let searchText =
      searchInput.length > 0 ? encodeURI(searchInput.trim()) : "";
    async function fetchCustomer() {
      setLoading(true);
      await axios
        .get(`/api/customers?search=${searchText}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }
    fetchCustomer();
  };

  const handleKeyDown = (e) => {
    let key = false;
    if (e.key === "Enter") {
      key = true;
      setPageNumber(0);
      if (key) {
        handleSearch();
      }
    }
  };

  const handleClear = () => {
    setSearchInput("");
    setLoading("clear");
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    // setPageNumber(0)
  };

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      await axios
        .get("/api/customers")
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading == "clear"]);
  return (
    <Layout>
      <div>
        <div className=" bg-white shadow-sm">
          <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 space-y-2 md:space-y-0 justify-between items-center">
            <div className={"ml-4 "}>
              <h1 className="text-lg leading-6 font-semibold text-gray-900">
                All Customers List
              </h1>
            </div>

            <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className={"flex"}>
                <div className=" flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input
                      onChange={handleSearchInput}
                      onKeyDown={handleKeyDown}
                      value={searchText}
                      className="form-input text-black px-2 block w-full bg-inherit border border-black rounded-none rounded-l-md transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      placeholder={"Search"}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="-ml-px relative inline-flex bg-inherit border border-black items-center px-4 py-2 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    {/* Heroicon name: sort-ascending */}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {/*<span className="ml-2">Search</span>*/}
                  </button>
                </div>
                <div className={"mt-1 mx-2"}>
                  <button
                    onClick={handleClear}
                    className={
                      "inline-flex items-center px-3.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
                    }
                    type={"button"}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <ReactPaginate
                  forcePage={Number(pageNumber)}
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  activeClassName={"active bg-black text-white"}
                  containerClassName={"relative z-0 inline-flex shadow-sm"}
                  subContainerClassName={"pages pagination"}
                  initialPage={1}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={pagginationHandler}
                  previousClassName={
                    "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  }
                  pageClassName={
                    "hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  }
                  nextClassName={
                    "-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  }
                />
              </div>
            </div>

            <div className={"ml-4 "}>
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="inline-flex items-center px-3 py-2.5 border border-transparent text-sm leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                Add New
              </button>
            </div>
          </div>
        </div>
        <div className=" mx-auto py-2">
          {loading ? (
            <PlaceHolderLoading loading={true} />
          ) : (
            <div className=" py-4 sm:px-0">
              <CustomerGrid data={data} setData={setData} setIsOpen={setIsOpen}/>
            </div>
          )}
        </div>
        <Modal
          isOpen={isOpen}
          showXButton
          onClose={() => setIsOpen(false)}
          className={"max-w-5xl"}
        >
          <Modal.Title>Add New Customer</Modal.Title>
          <Modal.Content>
            <div>
              <CustomerForm setIsOpen={setIsOpen} data={data} setData={setData}/>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    </Layout>
  );
};

export default Customers;
