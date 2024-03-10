import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isNumber, sumBy } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import { convertBengaliToEnglishNumber } from "../PDF/InvoiceDef";
import useSound from "use-sound";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PlaceHolderLoading, { SpingSvgIcon } from "@/common/PlaceHolderLoading";
import axios from "axios";
import { errorAlert, successAlert } from "@/common/SweetAlert";
import Modal from "../Module/Modal";
import { generatePackingPDF } from "../PDF/packingDef";
import { generateLedgerPDF } from "../PDF/accountLedger";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NumberFormat from "react-number-format";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const BalanceDetails = (props) => {
  const { type, items, setShowModal, data, setData,loading, setLoading } = props;
  // const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { handleSubmit } = useForm({ mode: "all" });

  const [addItemsSoundPlay] = useSound("/assets/sounds/save.mp3", {
    volume: 0.25,
  });
  const [deleteItemsSoundPlay] = useSound("/assets/sounds/delete-item.mp3", {
    volume: 0.25,
  });

  // const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     async function fetchCustomers() {
  //       setLoading(true);
  //       await axios
  //         .get(`/api/customers-bills`)
  //         .then((res) => {
  //           setData(res.data.data);
  //         })
  //         .catch((err) => {
  //           errorAlert("Something went wrong!");
  //         })
  //         .finally(() => setLoading(false));
  //     }
  //     fetchCustomers();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const calculationDueBill = (item) => {
    if (item.totalDueBill) {
      return Number(item.totalDueBill).toFixed(2);
    } else {
      let total =
        sumBy(item.data, (v) => Number(v.totalAmount || 0)) +
        Number(item?.rmb?.qty || 0) * Number(item?.rmb?.rate || 0) +
        Number(item?.due || 0) -
        Number(item?.paid || 0);
      return total.toFixed(2);
    }
  };
  const renderText = (cellInfo) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <input
        className={`uppercase text-center block w-full px-4 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
        type="text"
        value={cellValue}
        onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
      />
    );
  };

  const renderEditable = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <>
        <NumberFormat
          thousandSeparator={true}
          onValueChange={(values, sourceInfo) => {
            const { formattedValue, value } = values;
            // handleCellRenderChange(row, value);
            handleCellRenderChange(cellInfo, value);
          }}
          className={`uppercase text-center block w-full px-4 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
          value={cellValue}
          // decimalScale={0}
          // fixedDecimalScale={2}
        />
      </>
    );
  };

  const handleCellRenderChange = (cellInfo, val) => {
    const newData = [...data];
    newData[cellInfo.index][cellInfo.column.id] = val;
    let debit = Number(newData[cellInfo.index]["debit"] || 0).toFixed(2);
    let credit = Number(newData[cellInfo.index]["credit"] || 0);
    newData[cellInfo.index]["total"] = Number(debit) - Number(credit) || 0;
    setData(newData);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const convertTotalAmount = (val, toFixed) => {
    return convertBengaliToEnglishNumber(
      val.toLocaleString("bn", {
        minimumFractionDigits: toFixed || 2,
      })
    );
  };

  const handleOnSubmit = (val, index) => {
    addItemsSoundPlay();
    const newData = {
      ...val,
    };
    Swal.fire({
      title: `ARE YOU SURE FOR UPDATE?`,
      icon: "question",
      confirmButtonColor: "#006EB8",
      confirmButtonText: `Confirm`,
      allowOutsideClick: false,
      // cancelButtonText: "No",
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async (resP) => {
      if (resP.isConfirmed) {
        setLoading(index);
        delete newData?._id;
        await axios
          .post(`/api/balance?=id${val?._id || null}`, { ...newData })
          .then((res) => {
            console.log("res", res);
            successAlert("Successfully Update");
          })
          .catch((err) => {
            console.log("err", err);
            errorAlert("Something went wrong!");
          })
          .finally(() => setLoading(false));
      } else {
        return;
      }
    });
  };

  const handleDelete = (val, index) => {
    deleteItemsSoundPlay();
    const newData = {
      ...val,
    };

    Swal.fire({
      title: `ARE YOU SURE FOR DELETE?`,
      icon: "question",
      confirmButtonColor: "#006EB8",
      confirmButtonText: `Confirm`,
      allowOutsideClick: false,
      // cancelButtonText: "No",
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async (resP) => {
      if (resP.isConfirmed) {
        if (val?._id) {
          setLoading(index);
          delete newData?._id;
          await axios
            .delete(`/api/balance?=id ` + val?._id)
            .then((res) => {
              // console.log("res", res);
              successAlert("Successfully Deleted.");
            })
            .catch((err) => {
              // console.log("err", err);
              errorAlert("Something went wrong!");
            })
            .finally(() => {
              setLoading(false);
              if (index > -1) {
                let newItems = [...data];
                newItems.splice(index, 1);
                setData(newItems);
              }
            });
        } else {
          if (index > -1) {
            let newItems = [...data];
            newItems.splice(index, 1);
            setData(newItems);
          }
        }
      } else {
        return;
      }
    });
  };

  const downloadPDF = () => {
    // var win = window.open("", "_blank");
    const newData = [...data];
    // if (
    //   !isEmpty(aditionalInfo?.rmb) &&
    //   aditionalInfo?.rmb?.qty &&
    //   aditionalInfo?.rmb?.rate
    // ) {
    //   newData.push({
    //     des: aditionalInfo?.rmb?.des || "REPACKING CHARGE",
    //     qty: aditionalInfo?.rmb?.qty,
    //     rate: aditionalInfo?.rmb?.rate,
    //     totalAmount:
    //       Number(aditionalInfo?.rmb?.qty) * Number(aditionalInfo?.rmb?.rate) ||
    //       0,
    //   });
    // }
    const newInfo = {
      customerId: newData[0]["customerId"],
      customerName: newData[0]["customerName"],
      shipmentNo: newData.map((item) => item.shipmentNo),
      data: newData,
    };
    generateLedgerPDF(newInfo);
  };
  // if (loading) {
  //   return <PlaceHolderLoading loading={true} />;
  // }

  const onSubmit = (val) => {
    // addItemsSoundPlay()
    let newData = [...data];
    const newBill = {
      details: "",
      debit: "",
      credit: "",
      total: "",
    };
    newData.push(newBill);
    setData(newData);
  };

  // useEffect(() => {
  //   if (data?.length < 1) {
  //     const newBill = {
  //       details: "",
  //       debit: "",
  //       credit: "",
  //       total: "",
  //     };
  //     setData([{ ...newBill }]);
  //   }
  // }, [data?.length, setData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ReactTable
        data={data}
        columns={[
          {
            Header: "SL",
            accessor: "sl",
            Cell: (row) => (
              <div className="flex flex-col items-center">
                <p>{row.viewIndex + 1}</p>
                {data && data?.length - 1 === row?.viewIndex && (
                  <button
                    type="submit"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            ),
            Footer: () => <p className="text-center">Total-</p>,
            width: 120,
          },
          {
            Header: "DETAILS",
            accessor: "details",
            Cell: renderText,
            width: 500,
          },

          {
            Header: "Debit",
            accessor: "debit",
            Cell: renderEditable,
            // Cell: ({ row }) => (
            //   <p className="text-center">
            //     {convertTotalAmount(Number(row?._original?.totalAmount))}
            //   </p>
            // ),
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(sumBy(data, (item) => Number(item.debit || 0)))}
              </p>
            ),
          },
          {
            Header: "Credit",
            accessor: "credit",
            Cell: renderEditable,
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(
                  sumBy(data, (item) => Number(item.credit || 0))
                )}
              </p>
            ),
          },
          {
            Header: "Total Taka",
            accessor: "total",
            Cell: ({ row }) => (
              <p className="text-right">
                {convertTotalAmount(Number(row?._original?.total || 0))}
              </p>
            ),
            Footer: ({ row }) => (
              <p className="text-center">
                {convertTotalAmount(sumBy(data, (item) => Number(item.total || 0)))}
              </p>
            ),
          },
          {
            Header: "Action",
            accessor: "##",
            Cell: ({ row }) => (
              <div className={"text-center flex space-x-1"}>
                <button
                  onClick={(e) => handleOnSubmit(row._original, row._viewIndex)}
                  className=" uppercase inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  disabled={loading === row._viewIndex}
                  type="button"
                >
                  {loading === row._viewIndex ? (
                    <>
                      <SpingSvgIcon />
                      Updating..
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  onClick={(e) => handleDelete(row._original, row._viewIndex)}
                  className=" uppercase inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  disabled={loading === row._viewIndex}
                  type="button"
                >
                  {loading === row._viewIndex ? (
                    <>
                      <SpingSvgIcon />
                      Deleting..
                    </>
                  ) : (
                    "Delete"
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
        className="-striped -highlight"
        defaultPageSize={200}
        minRows={12}
        showPageJump={false}
        pageSizeOptions={[200, 250, 300]}
        showPagination={true}
        // showPagination={false}
        sortable={true}
        loading={loading}
      />
    </form>
  );
};

export default BalanceDetails;
