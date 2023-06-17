import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ currentPage, pageCount, pagginationHandler }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      activeClassName={"active bg-gray-800 text-gray-300"}
      containerClassName={"relative z-0 flex shadow-sm space-x-1 justify-center md:justify-start"}
      subContainerClassName={"pages pagination"}
      initialPage={0}
      forcePage={currentPage - 1}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onClick={pagginationHandler}
      disabledClassName={"bg-gray-300 cursor-not-allowed"}
      disabledLinkClassName={"cursor-not-allowed"}
      previousClassName={
        "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      }
      pageClassName={
        " inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      }
      nextClassName={
        "-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      }
    />
  );
};

export default Pagination;
