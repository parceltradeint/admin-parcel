import CreditVoucher from "@/components/FormSegment/CreditVoucher";
import { generateCreditVoucher } from "@/components/PDF/creditVoucher";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumb = ({ items = [], type }) => {
  const billType =
    type == "customer"
      ? "outbound"
      : type == "cnf"
      ? "inbound"
      : type == "packing"
      ? type
      : false;
  const router = useRouter();
  const billNew = async () => {
    // const billType = type == "customer" ? "outbound" : "inbound"
    router.push({
      pathname: "/bill/new/" + billType,
      asPath: "/bill/new/[slug]",
      query: { ...router.query, type: billType },
    });
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className="flex md:justify-between justify-center items-center md:items-start md:space-y-0 space-y-1 flex-col md:flex-row px-5 py-3  border border-gray-200 rounded-lg bg-gray-50   text-primaryBg md:text-xl uppercase"
        aria-label="Breadcrumb"
      >
        <ol className=" flex flex-wrap md:space-x-1 md:space-x-3 self-start">
          <li className="inline-flex items-center md:gap-2 uppercase">
            <Link
              href="/dashboard"
              className="inline-flex items-center font-medium hover:text-blue-600"
            >
              <FiHome className="mx-2" />
              Home
            </Link>
            {items.length > 0 && <FiChevronRight className="md:mx-1" />}
          </li>
          {items.map((item, index) => {
            return (
              <li key={index}>
                <div className="flex items-center md:gap-2 uppercase">
                  {item.href ? (
                    <Link
                      className="inline-flex items-center font-medium hover:text-blue-600"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="md:whitespace-nowrap">{item.label}</span>
                  )}
                  {index !== items.length - 1 && (
                    <FiChevronRight className="md:mx-1" />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        {billType && (
          <div className={"md:ml-4 flex space-x-2"}>
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className=" md:px-3 px-5 py-1 border border-transparent text-sm md:leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Create Credit Voucher
            </button>
            <button
              onClick={billNew}
              type="button"
              className=" md:px-3 px-5 py-1 border border-transparent text-sm md:leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Add New
            </button>
          </div>
        )}
      </nav>
      {isOpen && <CreditVoucher isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>

    // <ol className="list-reset flex flex-wrap text-xl text-dark-300 px-5">
    //   {items.map((item, index) => {
    //     return (
    //       <li key={index} className="flex items-center gap-2">
    //         {item.href ? (
    //           <Link
    //             className="whitespace-nowrap font-medium text-primary-500 transition-colors duration-150 hover:text-primary-600 dark:hover:text-primary-600"
    //             href={item.href}
    //           >
    //             {item.label}
    //           </Link>
    //         ) : (
    //           <span className="whitespace-nowrap">{item.label}</span>
    //         )}
    //         {index !== items.length - 1 && (
    //           <span className="px-1 text-xl">
    //             <FiChevronRight />
    //           </span>
    //         )}
    //       </li>
    //     );
    //   })}
    // </ol>
  );
};

export default Breadcrumb;
