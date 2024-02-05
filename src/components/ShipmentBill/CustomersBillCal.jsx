import { sumBy } from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import { convertBengaliToEnglishNumber } from "../PDF/InvoiceDef";
import PlaceHolderLoading, { SpingSvgIcon } from "@/common/PlaceHolderLoading";
import axios from "axios";
import { errorAlert } from "@/common/SweetAlert";

import CustomerAllDueBills from "./CustomerAllDueBills";
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
          setData(res.data.data);
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
        paid,
        discount,
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
  const groupedArray = Object.values(groupedByCustomerId);

  if (loading) {
    return <PlaceHolderLoading loading={true} />;
  }

  return (
    <>
      <ReactTable
        data={groupedArray}
        columns={[
          {
            Header: "Shiping Mark",
            accessor: "customerName",
            // Cell: renderText,
            Footer: () => <p className="text-center">Total-</p>,
          },
          {
            Header: "Shipment By",
            accessor: "shipmentBy",
            // Cell: renderText,
          },
          {
            Header: "Total Kg",
            accessor: "totalKg",
            // Cell: renderText,
            Footer: () => (
              <p className="text-center">
                {sumBy(groupedArray, (item) => Number(item.totalKg)).toFixed(2)}
              </p>
            ),
          },
          {
            Header: "Shipment No",
            accessor: "shipmentNo",
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
            // Cell: renderText,
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(
                  sumBy(groupedArray, (item) => Number(item.balance))
                )}
              </p>
            ),
          },
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
        className="-striped -highlight text-center"
        defaultPageSize={200}
        minRows={12}
        showPageJump={false}
        pageSizeOptions={[200, 250, 300]}
        showPagination={true}
        // showPagination={false}
        sortable={true}
      />
      {showModal && (
        <CustomerAllDueBills items={showModal} setShowModal={setShowModal} type={type} />
      )}
    </>
  );
};

export default CustomersBillCal;
