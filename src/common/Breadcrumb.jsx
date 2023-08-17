import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumb = ({ items = [], type }) => {
  const router = useRouter();
  const billNew = async () => {
    const billType = type == "customer" ? "outbound" : "inbound"
    router.push({
      pathname: "/bill/new/" + billType,
      asPath: "/bill/new/[slug]",
      query: { ...router.query, type: billType },
    });
  };

  return (
    <nav
      className="flex justify-between px-5 py-3  border border-gray-200 rounded-lg bg-gray-50 text-green-600 text-xl"
      aria-label="Breadcrumb"
    >
      <ol className=" flex flex-wrap space-x-1 md:space-x-3">
        <li className="inline-flex items-center gap-2 capitalize">
          <Link
            href="/dashboard"
            className="inline-flex items-center font-medium hover:text-blue-600"
          >
            <FiHome className="mx-2" />
            Home
          </Link>
          {items.length > 0 && <FiChevronRight className="mx-1" />}
        </li>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <div className="flex items-center gap-2 capitalize">
                {item.href ? (
                  <Link
                    className="inline-flex items-center font-medium hover:text-blue-600"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
                {index !== items.length - 1 && (
                  <FiChevronRight className="mx-1" />
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <div className={"ml-4 "}>
        <button
          onClick={billNew}
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
          Add New Invoice
        </button>
      </div>
    </nav>

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
