import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isNumber, sumBy } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import ReactTable from "react-table-v6";
import { convertBengaliToEnglishNumber, generatePDF } from "../PDF/InvoiceDef";
import useSound from "use-sound";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PlaceHolderLoading, { SpingSvgIcon } from "@/common/PlaceHolderLoading";
import axios from "axios";
import { errorAlert, successAlert } from "@/common/SweetAlert";
import { generateExportBills } from "../PDF/generateExportBills";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NumberFormat from "react-number-format";
import { generateShipmentBills } from "../PDF/generateShipmentBills";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MdCloudUpload } from "react-icons/md";
import { IoClose, IoEyeSharp } from "react-icons/io5";
import { SlideshowLightbox } from "lightbox.js-react";
import { extractDetails, fileToDataUri, onFileUpload } from "@/lib/utilis";
import Tesseract from "tesseract.js";

const ShipmentBillCal = (props) => {
  const { type } = props;
  const [data, setData] = useState([...props.data]);
  const router = useRouter();
  const [addItemsSoundPlay] = useSound("/assets/sounds/save.mp3", {
    volume: 0.25,
  });
  const [loading, setLoading] = useState(false);
  const [showImg, setShowImg] = useState(false);

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

  const renderNormalEditable = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <>
        {cellValue?.length > 0 && isNaN(Number(cellValue)) ? (
          <span className="flex flex-col space-y-1">
            {cellValue.map((value, i) => (
              <input
                key={i}
                className={`uppercase text-center block w-full px-4 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
                name="input"
                step={"any"}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  handleCellRenderChange(cellInfo, e.target.value)
                }
                // value={parseFloat(value.replace(/,/g, ''))}
                value={value?.split(".")[0]}
                // value={parseInt(value.replace(/,/g, ''), 10)}
                //   value={convertTotalAmount(Number(cellValue), 0)}
                type="text"
                //   defaultValue={
                //     cellInfo.column.id === "debit"
                //       ? Number(calculationDueBill(data[cellInfo.index]))
                //       : cellInfo || 0
                //   }
              />
            ))}
          </span>
        ) : (
          <input
            className={`uppercase text-center block w-full px-4 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
            name="input"
            step={"any"}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
            value={cellValue}
            //   value={convertTotalAmount(Number(cellValue), 0)}
            type="text"
            //   defaultValue={
            //     cellInfo.column.id === "debit"
            //       ? Number(calculationDueBill(data[cellInfo.index]))
            //       : cellInfo || 0
            //   }
          />
        )}
      </>
    );
  };
  const renderNormalEditableDate = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <>
        {cellValue ? (
          <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
            {cellValue || "--"}
          </p>
        ) : cellValue === null ? (
          <input
            className={`uppercase text-center block w-full px-4 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
            name="input"
            step={"any"}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
            value={cellValue}
            //   value={convertTotalAmount(Number(cellValue), 0)}
            type="date"
            //   defaultValue={
            //     cellInfo.column.id === "debit"
            //       ? Number(calculationDueBill(data[cellInfo.index]))
            //       : cellInfo || 0
            //   }
          />
        ) : (
          <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
            {"--"}
          </p>
        )}
      </>
    );
  };

  const renderEditableFileView = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <span className="flex items-center justify-center text-center px-4 py-1">
        {cellValue && (
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
                <img key={i} className="w-full rounded h-10" src={item} />
              ))}
          </SlideshowLightbox>
        )}
        {cellValue?.length > 0 && (
          <span className="flex flex-col items-start space-y-1">
            {cellValue?.map((item, i) => (
              <span
                key={i}
                className="flex items-start cursor-pointer"
                // onClick={}
              >
                <IoClose size={15} />
              </span>
            ))}
          </span>
        )}
      </span>
    );
  };

  const fileUploadCell = (cellInfo) => {
    return (
      <label className="flex justify-center">
        <span>
          <input
            type="file"
            className="hidden"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => {
              e.stopPropagation();
              handleChangeFile(cellInfo, e.target.files[0], "payslip");
            }}
            disabled={cellInfo?.original?.approval === "approval"}
          />
          <span className="flex items-center space-x-2 cursor-pointer">
            <MdCloudUpload size={25} />
          </span>
        </span>
      </label>
    );
  };

  const handleChangeFile = (cellInfo, value, columnId) => {
    const newData = [...data];
    fileToDataUri(value).then((photoURL) => {
      if (newData[cellInfo.index][columnId]) {
        newData[cellInfo.index][columnId] = [
          ...newData[cellInfo.index][columnId],
          photoURL,
        ];
      } else {
        newData[cellInfo.index][columnId] = [photoURL];
      }
      Tesseract.recognize(photoURL, "eng+ben", {
        logger: (m) => console.log("m", m),
      }).then(({ data: { text } }) => {
        const extract = extractDetails(text);
        newData[cellInfo.index]["trxDate"]?.concat(extract.trxDate);
        newData[cellInfo.index]["trxId"]?.concat(extract.trxId);
        newData[cellInfo.index]["credit"] = [
          ...newData[cellInfo.index]["credit"],
          extract.amount,
        ];
        setData(newData);
      });
    });
  };

  const handleCellRenderChange = (cellInfo, val) => {
    const newData = [...data];
    newData[cellInfo.index][cellInfo.column.id] = val;
    let debit = Number(newData[cellInfo.index]["totalAmount"] || 0).toFixed(2);
    let credit = Number(newData[cellInfo.index]["credit"] || "");
    let discount = Number(newData[cellInfo.index]["discount"] || 0);
    newData[cellInfo.index]["balance"] = Number(debit) - credit - discount;
    newData[cellInfo.index]["due"] = newData[cellInfo.index]["balance"];
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

  const handleOnSubmit = (val) => {
    addItemsSoundPlay();
    const newData = {
      ...val,
      //   totalDueBill: 98036,
    };

    Swal.fire({
      title: `ARE YOU SURE FOR UPDATE`,

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
        setLoading(val._id);
        delete newData?._id;
        // onFileUpload()
        //   await axios
        //     .patch(`/api/${type}`, {
        //       id: val?._id,
        //       data: { ...newData },
        //     })
        //     .then((res) => {
        //       successAlert("Successfully Update");
        //     })
        //     .catch((err) => {
        //       console.log("err", err);
        //       errorAlert("Something went wrong!");
        //     })
        //     .finally(() => setLoading(false));
      } else {
        return;
      }
    });
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
      {
        Header: "Total Due",
        accessor: "totalAmount",
        Cell: ({ row }) => (
          <p className="text-center">
            {convertTotalAmount(Number(calculationDueBill(row?._original)))}
          </p>
        ),
        Footer: ({ row }) => (
          <p className="text-center">
            {convertTotalAmount(
              sumBy(data, (item) => Number(calculationDueBill(item)))
            )}
          </p>
        ),
      },
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
        Cell: renderNormalEditable,
        Footer: ({ row }) => (
          <p className="text-center">
            {convertTotalAmount(
              sumBy(data, (item) => Number(item.credit || 0))
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
      {
        Header: "Payslip",
        accessor: "payslip",
        Cell: renderEditableFileView,
      },
      {
        Header: "Upload",
        accessor: "#UploadedFile",
        Cell: (cell) => fileUploadCell(cell),
      },
      {
        Header: "Trx Date",
        accessor: "trxDate",
        // Cell: ({ row }) => (
        //   <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
        //     {(row._original?.trxDate &&
        //       new Date(row._original?.trxDate).toLocaleString()) ||
        //       "--"}
        //   </p>
        // ),
        Cell: renderNormalEditableDate,
      },
      {
        Header: "Trx Id",
        accessor: "trxId",
        // Cell: ({ row }) => (
        //   <p className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
        //     {row._original?.trxId || "--"}
        //   </p>
        // ),
        Cell: renderNormalEditable,
      },
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
        Cell: ({ row }) => (
          <div className={"text-center flex space-x-2"}>
            <button
              onClick={(e) => handleOnSubmit(row._original)}
              className="uppercase inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              disabled={loading || !row._original?.payslip}
            >
              {loading === row._original?._id ? (
                <>
                  <SpingSvgIcon />
                  Updating
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              onClick={(e) => handleOnViewPDF(row._original)}
              className="uppercase inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded transition ease-in-out duration-150 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              View Pdf
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
    []
  );

  return (
    <>
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
    </>
  );
};

export default ShipmentBillCal;
