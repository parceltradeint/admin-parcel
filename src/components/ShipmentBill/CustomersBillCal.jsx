import { sumBy } from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import { convertBengaliToEnglishNumber } from "../PDF/InvoiceDef";
import PlaceHolderLoading, { SpingSvgIcon } from "@/common/PlaceHolderLoading";
import axios from "axios";
import { errorAlert } from "@/common/SweetAlert";

import CustomerAllDueBills, { getStatusColor } from "./CustomerAllDueBills";
import ToolTip from "@/common/ToolTip";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { generateExportBills } from "../PDF/generateExportBills";
const CustomersBillCal = (props) => {
  const { type } = props;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      await axios
        .get(`/api/customers-bills`)
        .then((res) => {
          const statusPriority = {
            pending: 1,
            ongoing: 2,
            rejected: 3,
            approved: 4,
          };
          const newData = res.data.data?.sort(
            (a, b) => statusPriority[a?.approval] - statusPriority[b?.approval]
          );
          setData(newData);
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertTotalAmount = (val, toFixed) => {
    return convertBengaliToEnglishNumber(
      val.toLocaleString("bn", {
        minimumFractionDigits: toFixed || 2,
      })
    );
  };

  const groupedByCustomerId = data.reduce((acc, item) => {
    const {
      customerId,
      due,
      totalKg,
      shipmentNo,
      totalAmount,
      balance,
      customerName,
      shipmentBy,
      credit,
      paid,
      discount = 0,
    } = item;

    // Check if there's already an entry for this customerId
    if (!acc[customerId]) {
      // If not, create a new entry with additional keys
      acc[customerId] = {
        items: [item],
        totalDue: due,
        totalKg,
        shipmentNo: [shipmentNo],
        totalAmount,
        balance,
        credit: Number(credit) || 0,
        customerName,
        shipmentBy: [shipmentBy],
        paid: Number(paid || 0),
        discount: Number(discount || 0),
      };
    } else {
      // If yes, append to the existing entry and update the additional keys
      acc[customerId].items.push(item);
      acc[customerId].totalDue += Number(due); // Update the additional key
      acc[customerId].totalKg += Number(totalKg); // Update the additional key
      acc[customerId].totalAmount += Number(totalAmount); // Update the additional key
      acc[customerId].credit += Number(credit) || 0; // Update the additional key
      acc[customerId].paid += Number(paid) || 0; // Update the additional key
      acc[customerId].discount += Number(discount) || 0; // Update the additional key
      acc[customerId].balance += Number(balance); // Update the additional key
      acc[customerId].customerName = customerName; // Update the additional key
      acc[customerId].shipmentBy.push(shipmentBy); // Update the additional key
      acc[customerId].shipmentNo.push(shipmentNo); // Update the additional key
    }

    return acc;
  }, {});

  // Convert the object back to an array
  const groupedArray = Object.values(groupedByCustomerId).sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  const handleExportBills = () => {
    if (window.confirm("Are you sure you want to export bills?")) {
      generateExportBills(groupedArray);
    }
  };

  if (loading) {
    return <PlaceHolderLoading loading={true} />;
  }

  return (
    <>
      <button
        type="button"
        className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 mx-auto flex justify-center uppercase"
        onClick={handleExportBills}
      >
        Export Due Bill
      </button>
      <ReactTable
        data={groupedArray}
        columns={[
          {
            Header: "SL",
            accessor: "customerName",
            Cell: (row) => <p>{row?.viewIndex + 1}</p>,
            width: 60,
            // Footer: () => <p className="text-center">Total-</p>,
          },
          {
            Header: "Shiping Mark",
            accessor: "customerName",
            Cell: ({ row }) => (
              <p className=" text-left">{row?._original?.customerName}</p>
            ),
            // Footer: () => <p className="text-center">Total-</p>,
            width: 220,
          },
          {
            Header: "By",
            accessor: "shipmentBy",
            Cell: ({ row }) => (
              <div className=" relative">
                <Tooltip
                  content={
                    <div className="absolute bg-black px-4 rounded-md py-1 z-50 w-auto">
                      <p>{row._original?.shipmentBy.join(", ")}</p>
                    </div>
                  }
                  placement="right"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span className=" cursor-pointer px-2 py-1 rounded bg-gray-500 ">
                    View
                  </span>
                </Tooltip>
              </div>
            ),
          },
          {
            Header: "Kg",
            accessor: "totalKg",
            Cell: ({ row }) => (
              <p>{Number(row._original.totalKg).toFixed(2)}</p>
            ),
            Footer: () => (
              <p className="text-center">
                {sumBy(groupedArray, (item) => Number(item.totalKg)).toFixed(2)}
              </p>
            ),
          },
          {
            Header: "S. No",
            accessor: "shipmentNo",
            Cell: ({ row }) => (
              <div className=" relative">
                <Tooltip
                  content={
                    <div className="absolute bg-black px-4 rounded-md py-1 z-50 w-24">
                      <p>{row._original?.shipmentNo.join(", ")}</p>
                    </div>
                  }
                  placement="right"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span className=" cursor-pointer px-2 py-1 rounded bg-gray-500 ">
                    View
                  </span>
                </Tooltip>
              </div>
            ),
            // Cell: renderText,
          },
          // {
          //   Header: "Total Bill",
          //   accessor: "totalBill",
          //   Cell: ({ row }) => <p>{calculationDueBill(row?._original)}</p>,
          // },
          {
            Header: "Debit",
            accessor: "debit",
            //   Cell: renderEditable,
            Cell: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(Number(row?._original?.totalAmount))}
              </p>
            ),
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(
                  sumBy(groupedArray, (item) => Number(item.totalAmount))
                )}
              </p>
            ),
          },
          {
            Header: "Credit",
            accessor: "credit",
            // Cell: renderEditable,
            Cell: ({ row }) => (
              <p>{convertTotalAmount(Number(row?._original?.credit))}</p>
            ),
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(
                  sumBy(groupedArray, (item) => Number(item.credit || 0))
                )}
              </p>
            ),
          },
          {
            Header: "Discount",
            accessor: "discount",
            Cell: ({ row }) => (
              <p>{convertTotalAmount(Number(row?._original?.discount))}</p>
            ),
            // Cell: renderEditable,
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(
                  sumBy(groupedArray, (item) => Number(item?.discount || 0)) ||
                    0
                )}
              </p>
            ),
          },
          {
            Header: "Balance",
            accessor: "balance",
            Cell: ({ row }) => (
              <p>{convertTotalAmount(Number(row?._original?.balance))}</p>
            ),
            // Cell: renderText,
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(
                  sumBy(groupedArray, (item) => Number(item.balance))
                )}
              </p>
            ),
          },
          // {
          //   Header: "Approval",
          //   accessor: "approval",
          //   Cell: ({ row }) => (
          //     <p
          //       className={`${getStatusColor(
          //         row?._original?.approval || "pending"
          //       )}`}
          //     >
          //       {row?._original?.approval || "Pending"}
          //     </p>
          //   ),
          // },
          {
            Header: "Action",
            accessor: "##",
            Cell: ({ row }) => (
              <div className={"text-center flex space-x-1"}>
                {/* <button
                  onClick={(e) => handleOnSubmit(row._original)}
                  className=" inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  disabled={loading}
                >
                  {loading === row._original?._id ? (
                    <>
                      <SpingSvgIcon />
                      Updating..
                    </>
                  ) : (
                    "Update"
                  )}
                </button> */}
                <button
                  onClick={(e) => setShowModal(row._original?.items)}
                  className=" uppercase inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  disabled={loading}
                >
                  {loading === row._original?._id ? (
                    <>
                      <SpingSvgIcon />
                      Viewing..
                    </>
                  ) : (
                    "View"
                  )}
                </button>
              </div>
            ),
          },
          // {
          //   //   id: "headerId",
          //   Header: "Action",
          //   accessor: "#",
          //   Cell: (row) => (
          //     <div className={"text-center flex flex-col space-y-2"}>
          //       <button
          //         type="submit"
          //         className="inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          //       >
          //         Update
          //       </button>
          //     </div>
          //   ),

          //   className: "sticky-r",
          //   headerClassName: "sticky-r",
          //   width: 100,
          // },
        ]}
        className="-striped -highlight text-center relative"
        defaultPageSize={200}
        minRows={12}
        showPageJump={false}
        pageSizeOptions={[200, 250, 300]}
        showPagination={true}
        // showPagination={false}
        sortable={true}
      />
      {showModal && (
        <CustomerAllDueBills
          items={showModal}
          setShowModal={setShowModal}
          type={type}
        />
      )}
    </>
  );
};

export default CustomersBillCal;
