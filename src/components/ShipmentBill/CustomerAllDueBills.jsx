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

const CustomerAllDueBills = (props) => {
  const { type, items, setShowModal } = props;
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([...props.items]);
  const router = useRouter();
  const [addItemsSoundPlay] = useSound("/assets/sounds/save.mp3", {
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
      </>
    );
  };

  const handleCellRenderChange = (cellInfo, val) => {
    const newData = [...data];
    newData[cellInfo.index][cellInfo.column.id] = val;
    let debit = Number(newData[cellInfo.index]["totalAmount"] || 0);
    let credit = Number(newData[cellInfo.index]["credit"] || 0);
    let discount = Number(newData[cellInfo.index]["discount"] || 0);
    newData[cellInfo.index]["balance"] = debit - credit - discount;
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
        setLoading(val?._id);
        delete newData?._id;
        await axios
          .patch(`/api/${type}`, {
            id: val?._id,
            data: { ...newData },
          })
          .then((res) => {
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

  return (
    <Modal
      isOpen={items ? true : false}
      showXButton
      onClose={() => setShowModal(false)}
      className={"w-auto"}
    >
      <Modal.Title>{"View Due Detail"}</Modal.Title>
      <Modal.Content>
        <div>
          <ReactTable
            data={data}
            columns={[
              // {
              //   Header: "User ID",
              //   accessor: "customerId",
              //   Cell: renderText,
              //   Footer: () => <p className="text-center">Total-</p>,
              // },
              {
                Header: "DATE",
                accessor: "deliveryDate",
                Cell: renderText,
                Footer: () => <p className="text-center">Total-</p>,
              },
              {
                Header: "S. Mark",
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
                Header: "No",
                accessor: "shipmentNo",
                Cell: renderText,
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
                      sumBy(data, (item) => Number(item.totalAmount))
                    )}
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
                Header: "Discount",
                accessor: "discount",
                Cell: renderEditable,
                Footer: ({ row }) => (
                  <p className="text-center">
                    {convertTotalAmount(
                      sumBy(data, (item) => Number(item?.discount || 0))
                    )}
                  </p>
                ),
              },
              {
                Header: "Balance",
                accessor: "balance",
                Cell: ({row}) => <p>{convertTotalAmount(Number(row?._original?.balance))}</p>,
                Footer: ({ row }) => (
                  <p className="text-center">
                    {convertTotalAmount(
                      sumBy(data, (item) => Number(item.balance))
                    )}
                  </p>
                ),
              },
              {
                Header: "Action",
                accessor: "##",
                Cell: ({ row }) => (
                  <div className={"text-center flex space-x-1"}>
                    <button
                      onClick={(e) => handleOnSubmit(row._original)}
                      className=" uppercase inline-flex items-center text-center mx-auto px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
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
          />

          <div className="flex justify-center space-x-3 mt-4">
            <button
              type="button"
              className=" text-white bg-indigo-600 hover:bg-indigo-500 font-bold py-2 px-4 rounded uppercase"
              onClick={downloadPDF}
            >
              Print LEDGER
            </button>
            <button
              type="button"
              className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded uppercase"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default CustomerAllDueBills;
