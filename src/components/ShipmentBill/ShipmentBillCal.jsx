/* eslint-disable jsx-a11y/alt-text */
import { isArray, isNumber, isUndefined, sumBy } from "lodash";
import React, { useMemo, useState } from "react";
import ReactTable from "react-table-v6";
import { convertBengaliToEnglishNumber, generatePDF } from "../PDF/InvoiceDef";
import useSound from "use-sound";
import Swal from "sweetalert2";
import { SpingSvgIcon } from "@/common/PlaceHolderLoading";
import axios from "axios";
import { errorAlert, successAlert } from "@/common/SweetAlert";
// import { generateExportBills } from "../PDF/generateExportBills";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NumberFormat from "react-number-format";
import { generateShipmentBills } from "../PDF/generateShipmentBills";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MdCloudUpload } from "react-icons/md";
import { IoClose, IoEye } from "react-icons/io5";
import { SlideshowLightbox } from "lightbox.js-react";
import { extractDetails, fileToDataUri, onFileUpload } from "@/lib/utilis";
import Tesseract from "tesseract.js";
import { ImageHosting } from "@/common/ImageHosting";
import banklist from "@/assets/bankList";
import OverlayLoading from "@/common/OverlayLoading";
import Modal from "../Module/Modal";
import { generateLedgerPDF } from "../PDF/accountLedger";
import PaymentSlipModal from "./PaymentSlipModal";

const ShipmentBillCal = (props) => {
  const { type } = props;
  const { data, setData } = props;

  const [addItemsSoundPlay] = useSound("/assets/sounds/save.mp3", {
    volume: 0.25,
  });
  const [loading, setLoading] = useState(false);
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [paySlipData, setPaySlipData] = useState([]);

  const calculationDueBill = (item) => {
    if (item.totalDueBill) {
      return Number(item.totalDueBill).toFixed(2);
    } else {
      let total =
        sumBy(item.data, (v) => Number(v.totalAmount || 0)) +
        Number(item?.rmb?.qty || 0) * Number(item?.rmb?.rate || 0);
      // Number(item?.due || 0) -
      // Number(item?.paid || 0);
      return total.toFixed(2);
    }
  };
  const renderText = (cellInfo) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
        {isNumber(cellValue)
          ? Number(cellValue).toFixed(2)
          : cellValue ||
            (!cellValue &&
              cellInfo.column.id === "balance" &&
              convertTotalAmount(
                Number(calculationDueBill(data[cellInfo.index]))
              ))}
      </p>
    );
  };

  const renderSelect = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index]["transactions"];
    return (
      <>
        {cellValue?.map((item, index) => (
          <select
            className={`uppercase whitespace-no-wrap text-sm leading-5  text-center block w-full px-4 py-1 my-2  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
            value={item?.trasferredBy}
            // onKeyDown={(e) => handleKeyDown(e, cellInfo)}
            onChange={(e) =>
              handleTrasferredBy(cellInfo.index, index, e.target.value)
            }
            defaultValue={item?.trasferredBy}
            key={index}
          >
            <option value={""}>Select Bank</option>
            {banklist.map((item, index) => (
              <option
                selected={item == item?.trasferredBy}
                value={item}
                key={index}
              >
                {item}
              </option>
            ))}
          </select>
        ))}

        {/* <input
          className={`uppercase text-center block w-full px-4 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
          name="input"
          step={"any"}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
          value={cellValue}
          //   value={convertTotalAmount(Number(cellValue), 0)}
          type="number"
          //   defaultValue={
          //     cellInfo.column.id === "debit"
          //       ? Number(calculationDueBill(data[cellInfo.index]))
          //       : cellInfo || 0
          //   }
        /> */}
      </>
    );
  };

  // const renderNormalEditable = (cellInfo, fixed) => {
  //   const cellValue = data[cellInfo.index][cellInfo.column.id];

  //   return (
  //     <>
  //       {
  //         cellValue?.length > 0 && isArray(cellValue) ? (
  //           <span className="flex flex-col space-y-1">
  //             {cellValue?.map((value, i) => (
  //               <>
  //                 {isNumber(value) ? (
  //                   <NumberFormat
  //                     thousandSeparator={true}
  //                     value={value}
  //                     displayType={"text"}
  //                     renderText={(value, props) => <p {...props}>{value}</p>}
  //                   />
  //                 ) : (
  //                   <p key={i}>{value}</p>
  //                 )}
  //               </>
  //             ))}
  //           </span>
  //         ) : (
  //           <p>{cellValue || "--"}</p>
  //         )
  //         // : (
  //         //   <input
  //         //     className={`uppercase text-center block w-full px-4 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
  //         //     name="input"
  //         //     step={"any"}
  //         //     onKeyDown={handleKeyDown}
  //         //     onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
  //         //     value={cellValue}
  //         //     //   value={convertTotalAmount(Number(cellValue), 0)}
  //         //     type="text"
  //         //     //   defaultValue={
  //         //     //     cellInfo.column.id === "debit"
  //         //     //       ? Number(calculationDueBill(data[cellInfo.index]))
  //         //     //       : cellInfo || 0
  //         //     //   }
  //         //   />
  //         // )
  //       }
  //     </>
  //   );
  // };
  const renderNormalEditableDate = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index]["transactions"];

    return (
      <>
        {cellValue?.length > 0 && isArray(cellValue) ? (
          <>
            {cellValue.map((value, i) => (
              <p
                key={i}
                className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center"
              >
                {value?.trxDate || "--"}
              </p>
            ))}
          </>
        ) : (
          <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
            {"--"}
          </p>
        )}
      </>
    );
  };

  const renderTrxId = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index]["transactions"];
    return (
      <>
        {cellValue?.map((value, i) => (
          <p
            key={i}
            className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center"
          >
            {value?.trxId}
          </p>
        ))}
      </>
    );
  };
  const renderAmount = (cellInfo, fixed) => {
    const cellValue = sumBy(
      data[cellInfo.index]["transactions"],
      (tran) => Number(tran.credit) || 0
    );

    return (
      <span className="flex flex-col space-y-1 justify-center text-center">
        <NumberFormat
          thousandSeparator={true}
          value={cellValue || 0}
          displayType={"text"}
          decimalScale={2}
          // renderText={(value, props) => (
          //   <p {...props}>{item?.credit || 0}</p>
          // )}
        />
        {/* {cellValue?.map((item, i) => (
          <>
            {isNumber(item?.credit) ? (
              <NumberFormat
                thousandSeparator={true}
                value={item?.credit || 0}
                displayType={"text"}
                decimalScale={2}
                // renderText={(value, props) => (
                //   <p {...props}>{item?.credit || 0}</p>
                // )}
              />
            ) : (
              <p key={i}>{0}</p>
            )}
          </>
        ))} */}
      </span>
    );
  };

  const renderEditableFileView = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index]["transactions"];

    return (
      <span className="flex items-center justify-center text-center px-4 py-1">
        {cellValue?.length > 0 && (
          <SlideshowLightbox
            key={JSON.stringify(cellValue)}
            showControls
            // open={showImg}
            // onClose={() => setShowImg(false)}
            // onOpen={() => setShowImg(true)}
            showThumbnails={true}
            backgroundColor="rgba(0, 0, 0, 0.034)" // Black with 70% opacity
            modalClose="clickOutside"
            animateThumbnails={true}
            className="lightbox-custom flex flex-col space-y-1"
            iconColor={"black"}
            // className="container grid grid-cols-3 gap-2 mx-auto"
          >
            {cellValue?.length > 0 &&
              cellValue?.map((item, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item + i}
                  className="w-full rounded h-10"
                  src={item?.payslip?.src || item?.payslip}
                />
              ))}
          </SlideshowLightbox>
        )}
        {cellValue?.length > 0 && (
          <span className="flex flex-col items-start space-y-1">
            {cellValue?.map((item, i) => (
              <div key={i} className="flex items-start space-x-1">
                <span
                  className="flex items-start cursor-pointer"
                  onClick={() => handleDeletePayslip(i, cellInfo.index)}
                >
                  <IoClose size={15} />
                </span>
                <span
                  className="flex items-start cursor-pointer"
                  onClick={() => {
                    setPaySlipData(cellValue);
                    setIsOpen(true);
                  }}
                >
                  <IoEye size={15} />
                </span>
              </div>
            ))}
          </span>
        )}
      </span>
    );
  };

  const handleDeletePayslip = (index, cellIndex) => {
    errorAlert("Are you sure you want to delete this payslip?").then((res) => {
      if (res.isConfirmed) {
        const newData = [...data];
        if (index !== -1) {
          // Remove the transaction
          newData[cellIndex].transactions.splice(index, 1);
          newData[cellIndex]["approval"] = "pending";
          // Recalculate the balance
          if (newData[cellIndex].totalAmount) {
            newData[cellIndex].balance =
              Number(newData[cellIndex].totalAmount) -
              newData[cellIndex].transactions.reduce(
                (acc, tran) => acc + Number(tran.credit),
                0
              );
          }
          setData(newData);
        }
      }
    });
  };

  const handleCellRenderChange = (cellInfo, val) => {
    const newData = [...data];
    // newData[cellInfo.index][cellInfo.column.id] = val;
    // let debit = Number(newData[cellInfo.index]["totalAmount"] || 0).toFixed(2);
    // let credit = Number(newData[cellInfo.index]["credit"] || "");
    // let discount = Number(newData[cellInfo.index]["discount"] || 0);
    // newData[cellInfo.index]["balance"] = Number(debit) - credit - discount;
    // newData[cellInfo.index]["due"] = newData[cellInfo.index]["balance"];
    newData[cellInfo.index].transactions.splice(index, 1);

    setData(newData);
  };

  const handleTrasferredBy = (index, indexToUpdate, val) => {
    const newData = [...data];
    newData[index].transactions[indexToUpdate]["trasferredBy"] = val;
    setData(newData);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const convertTotalAmount = (val, toFixed) => {
    if (val === null || val === undefined || val === "") {
      return 0;
    } else {
      return convertBengaliToEnglishNumber(
        val.toLocaleString("bn", {
          minimumFractionDigits: toFixed || 2,
        })
      );
    }
  };

  //   if (loading) {
  //     return <PlaceHolderLoading loading={true} />;
  //   }

  const handleExportBills = () => {
    if (window.confirm("Are you sure you want to export bills?")) {
      generateShipmentBills(data, {
        shipmentBy: data[0]["shipmentBy"] || "",
        reporting: data[0]["reporting"] || "",
        shipmentNo: data[0]["shipmentNo"] || "",
        deliveryDate: data[0]["deliveryDate"] || "",
      });
    }
  };

  const handleOnViewPDF = (value) => {
    const newInfo = {
      ...value,
      // due: value.balance || 0,
      paid: value.credit || 0,
      watermark: Number(value.balance) <= 0,
    };
    generatePDF(newInfo);
    // generateExportBills(data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "SL",
        accessor: "sl",
        Cell: (row) => <p>{row.viewIndex + 1}</p>,
        Footer: () => <p className="text-center">Total-</p>,
        width: 50,
      },
      {
        Header: "Shiping Mark",
        accessor: "customerName",
        Cell: renderText,
      },
      {
        Header: "By",
        accessor: "shipmentBy",
        Cell: renderText,
      },
      {
        Header: "Kg",
        accessor: "totalKg",
        Cell: renderText,
        Footer: () => (
          <p className="text-center">
            {sumBy(data, (item) => Number(item.totalKg)).toFixed(2)}
          </p>
        ),
      },
      {
        Header: "S. No.",
        accessor: "shipmentNo",
        Cell: renderText,
      },
      // {
      //   Header: "Total Due",
      //   accessor: "totalAmount",
      //   Cell: ({ row }) => (
      //     <p className="text-center">
      //       {convertTotalAmount(Number(calculationDueBill(row?._original)))}
      //     </p>
      //   ),
      //   Footer: ({ row }) => (
      //     <p className="text-center">
      //       {convertTotalAmount(
      //         sumBy(data, (item) => Number(calculationDueBill(item)))
      //       )}
      //     </p>
      //   ),
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
              sumBy(data, (item) => Number(item.totalAmount))
            )}
          </p>
        ),
      },
      {
        Header: "Credit",
        accessor: "credit",
        Cell: renderAmount,
        Footer: (row) => (
          <p className="text-center">
            {convertTotalAmount(
              sumBy(
                data.flatMap((item) => item.transactions || []),
                (tran) => Number(tran.credit) || 0
              )
            )}
          </p>
        ),
      },

      // {
      //   Header: "Discount",
      //   accessor: "discount",
      //   Cell: renderEditable,
      //   Footer: ({ row }) => (
      //     <p className="text-center">
      //       {convertTotalAmount(
      //         sumBy(data, (item) => Number(item?.discount || 0))
      //       )}
      //     </p>
      //   ),
      // },
      {
        Header: "Balance",
        accessor: "balance",
        Cell: ({ row }) => (
          <p className="text-center">
            {convertTotalAmount(Number(row?._original?.balance))}
          </p>
        ),
        Footer: ({ row }) => (
          <p className="text-center">
            {convertTotalAmount(sumBy(data, (item) => Number(item.balance)))}
          </p>
        ),
      },
      // {
      //   Header: "Payslip",
      //   accessor: "payslip",
      //   Cell: renderEditableFileView,
      // },
      // {
      //   Header: "Upload",
      //   accessor: "#UploadedFile",
      //   Cell: (cell) => fileUploadCell(cell),
      // },
      // {
      //   Header: "Trx Date",
      //   accessor: "trxDate",
      //   Cell: renderNormalEditableDate,
      // },
      // {
      //   Header: "Trx Id",
      //   Cell: renderTrxId,
      // },
      // {
      //   Header: "Transfered By",
      //   accessor: "transferedBy",
      //   Cell: renderSelect,
      // },
      // {
      //   Header: "Amount",
      //   accessor: "amount",
      //   // Cell: ({ row }) => (
      //   //   <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
      //   //     {row._original?.amount || "--"}
      //   //   </p>
      //   // ),
      //   Cell: renderNormalEditable,
      // },
      {
        Header: "Approval",
        accessor: "approval",
        Cell: ({ row }) => (
          <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
            {row._original?.approval || "Pending"}
          </p>
        ),
      },
      {
        Header: "Action",
        accessor: "##",
        Cell: (cell) => (
          <div className={"text-center flex space-x-2 justify-center"}>
            <button
              onClick={(e) => {
                setPaySlipData(cell);
                setIsOpen(true);
              }}
              className="uppercase inline-flex items-center text-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Payment Slip
            </button>
            {/* <button
              onClick={(e) => handleOnSubmit(row._original, row._index)}
              className="uppercase inline-flex items-center text-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              disabled={
                loading || row._original?.approval === "approved"
                // ||
                // !row._original?.transactions > 0 ||
                // isUndefined(
                //   row._original?.transactions[row._index]?.["trasferredBy"]
                // )
              }
            >
              {loading ? (
                <>
                  <SpingSvgIcon />
                  Updating
                </>
              ) : (
                "Update"
              )}
            </button> */}
            {/* <button
              onClick={(e) => handleOnViewPDF(row._original)}
              className="uppercase inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded transition ease-in-out duration-150 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              View Pdf
            </button> */}
            <button
              onClick={(e) => ledgerPDF(cell.row._original)}
              className="uppercase inline-flex items-center text-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded transition ease-in-out duration-150 bg-red-600 hover:bg-red-700 text-white"
              disabled={ledgerLoading}
            >
              {ledgerLoading == cell.row._original?._id ? (
                <>
                  <SpingSvgIcon />
                  Making
                </>
              ) : (
                "Ledger"
              )}
            </button>
          </div>
        ),
        width: 200,
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
    ],
    [loading, ledgerLoading]
  );
  // const paySlipcolumns = useMemo(
  //   () => [
  //     {
  //       Header: "SL",
  //       accessor: "sl",
  //       Cell: (row) => <p>{row.viewIndex + 1}</p>,
  //       Footer: () => <p className="text-center">Total-</p>,
  //       width: 50,
  //     },

  //     {
  //       Header: "S. No.",
  //       accessor: "shipmentNo",
  //       Cell: renderText,
  //     },
  //     {
  //       Header: "Trx Date",
  //       accessor: "trxDate",
  //       Cell: renderNormalEditableDate,
  //     },
  //     {
  //       Header: "Trx Id",
  //       Cell: renderTrxId,
  //     },
  //     {
  //       Header: "Transfered By",
  //       accessor: "transferedBy",
  //       Cell: renderSelect,
  //     },
  //   ],
  //   []
  // );

  const ledgerPDF = async (row) => {
    setLedgerLoading(row?._id);
    let billsData = await axios
      .get(`/api/customers-bills?customerId=` + row?.customerId)
      .then((res) => {
        const statusPriority = {
          pending: 1,
          "due-pending": 2,
          rejected: 3,
          approved: 4,
        };
        // const newData = orderBy(
        //   res.data?.data,
        //   [
        //     // First criterion: whether the item has an 'approval' key and is valid
        //     (o) => (o?.approval in statusPriority ? 0 : 1),
        //     // Second criterion: sort by the defined statusPriority or default to a large number
        //     (o) => statusPriority[o?.approval] || Number.MAX_VALUE,
        //   ],
        //   ["asc", "asc"] // Sorting directions for each criterion
        // );
        return [...res.data?.data];
      })
      .catch((err) => {
        errorAlert("Something went wrong!");
      })
      .finally(() => setLedgerLoading(false));

    const newData = billsData?.length > 0 ? [...billsData] : [];
    if (billsData?.length > 0) {
      const newInfo = {
        customerId: newData[0]["customerId"],
        customerName: newData[0]["customerName"],
        shipmentNo: newData.map((item) => item.shipmentNo),
        data: newData,
      };

      generateLedgerPDF(newInfo);
    }
  };

  return (
    <>
      {/* {loading && <OverlayLoading />} */}
      <button
        type="button"
        className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 mx-auto flex justify-center uppercase"
        onClick={handleExportBills}
      >
        Export Bill
      </button>
      <ReactTable
        data={data}
        columns={columns}
        className="-striped -highlight px-3 overflow-auto"
        defaultPageSize={200}
        minRows={12}
        showPageJump={false}
        pageSizeOptions={[200, 250, 300]}
        showPagination={true}
        // showPagination={false}
        sortable={true}
      />
      <PaymentSlipModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        paySlipData={paySlipData}
        setPaySlipData={setPaySlipData}
        data={data}
        setData={setData}
        type={type}
      />
    </>
  );
};

export default ShipmentBillCal;

export const monthMap = {
  জানু: "January",
  ফেব: "February",
  মার্চ: "March",
  এপ্রি: "April",
  মে: "May",
  জুন: "June",
  জুলা: "July",
  আগ: "August",
  সেপ্টে: "September",
  অক্টো: "October",
  নভে: "November",
  ডিসে: "December",
};
