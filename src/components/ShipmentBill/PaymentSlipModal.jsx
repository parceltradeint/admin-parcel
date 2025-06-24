import { SpingSvgIcon } from "@/common/PlaceHolderLoading";
import React, { useState } from "react";
import Modal from "../Module/Modal";
import NumberFormat from "react-number-format";
import { SlideshowLightbox } from "lightbox.js-react";
import { isArray, sumBy } from "lodash";
import { fileUploadCell, monthMap } from "./ShipmentBillCal";
import { MdCloudUpload } from "react-icons/md";
import { extractDetails, fileToDataUri, onFileUpload } from "@/lib/utilis";
import banklist from "@/assets/bankList";
import { errorAlert, successAlert } from "@/common/SweetAlert";
import Swal from "sweetalert2";
import useSound from "use-sound";
import Tesseract from "tesseract.js";
import { ImageHosting } from "@/common/ImageHosting";
import axios from "axios";
const PaymentSlipModal = ({
  isOpen,
  paySlipData,
  setIsOpen,
  setPaySlipData,
  data,
  setData,
  type,
}) => {
  const [addItemsSoundPlay] = useSound("/assets/sounds/save.mp3", {
    volume: 0.25,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileUploadCell = (cellInfo) => {
    return (
      <label className="flex justify-center" htmlFor="uploadFile">
        <span>
          <input
            type="file"
            className="hidden"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => {
              // e.stopPropagation();
              handleChangeFile(cellInfo, e.target.files[0], "payslip");
            }}
            id="uploadFile"
            // disabled={cellInfo?.original?.approval === "approval"}
          />
          <span className="  space-x-2 cursor-pointer">
            {uploading ? (
              <>
                <SpingSvgIcon />
                Uploading
              </>
            ) : (
              <p className="flex items-center space-x-2">
                <p>Upload Payment Slip</p>
                <MdCloudUpload size={20} />
              </p>
            )}
          </span>
        </span>
      </label>
    );
  };
  const handleChangeFile = (cellInfo, value, columnId) => {
    const newData = [...data];
    setUploading(true);
    fileToDataUri(value)
      .then((photoURL) => {
        const payslip = {
          src: photoURL,
          file: value,
        };
        Tesseract.recognize(photoURL, "eng+ben", {
          logger: (m) => console.log("m", m),
        }).then(({ data: { text } }) => {
          const extract = extractDetails(text);

          // Check if the 'transactions' array exists at the current index, if not create it
          if (!Array.isArray(newData[cellInfo?.index].transactions)) {
            newData[cellInfo.index].transactions = [];
          }

          // Create a new transaction object
          const newTransaction = {
            trxDate: extract?.trxDate,
            trxId: extract?.trxId,
            credit: parseFloat(extract?.amount?.replace(/,/g, "")), // Convert amount to float and remove commas
            payslip: payslip,
          };

          // Append the new transaction to the transactions array at the current index
          newData[cellInfo.index].transactions.push(newTransaction);

          // Optionally, compute the new balance if required
          if (newData[cellInfo.index].totalAmount) {
            newData[cellInfo.index].balance =
              Number(newData[cellInfo.index].totalAmount) -
              newData[cellInfo.index].transactions.reduce(
                (acc, tran) => acc + Number(tran.credit),
                0
              );
          }

          setData(newData);
        });
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const handleDeletePayslip = (index, cellIndex) => {
    successAlert("Are you sure you want to delete this payslip?").then(
      (res) => {
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
      }
    );
  };

  const handleOnSubmit = async (val, index) => {
    addItemsSoundPlay();
    const newData = {
      ...val,
      approval: val?.approval ?? "pending",
      //   totalDueBill: 98036,
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
        setLoading(true);
        delete newData?._id;
        newData["approval"] = newData["approval"] || "pending";
        // onFileUpload()
        if (isArray(newData?.transactions)) {
          for (let i = 0; i < newData?.transactions.length; i++) {
            const element = newData?.transactions[i];
            if (element?.payslip?.file) {
              const imageData = await ImageHosting(element?.payslip?.file);
              newData["transactions"][i]["payslip"] = imageData.url;
            }
          }
        }

        await axios
          .patch(`/api/${type}`, {
            id: val?._id,
            data: { ...newData },
          })
          .then((res) => {
            successAlert("Successfully Update");
            data[index] = { ...data[index], ...newData };
            setData(data);
          })
          .catch((err) => {
            console.log("err", err);
            errorAlert("Something went wrong!");
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
        return;
      }
    });
  };

  const handleTrasferredBy = (index, indexToUpdate, val) => {
    const newData = [...data];
    newData[index].transactions[indexToUpdate]["trasferredBy"] = val;
    setData(newData);
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        showXButton
        onClose={() => {
          setPaySlipData(null);
          setIsOpen(false);
        }}
        className="bg-gray-100"
        key={paySlipData?.original}
      >
        <Modal.Title>
          <div className=" text-center mx-auto">
            <div className="flex-1">
              <p className="text-xl">Parcel Trade International</p>
              <p className="text-base">CUSTOMER PAYMENT DETAILS</p>
              <hr />
            </div>
            {/* <button
              onClick={() => {
                setIsOpen(false);
                setPaySlipData(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-3"
            >
              Close
            </button> */}
          </div>
        </Modal.Title>
        <Modal.Content>
          <div className=" mx-auto flex justify-center">
            <table className="table-auto border border-black text-sm">
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-2 font-semibold">
                    SHIPPING MARK: {paySlipData?.original?.customerName}
                  </td>
                  <td className="border border-black px-2 py-2 font-semibold">
                    S.NO: {paySlipData?.original?.shipmentNo}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-2">
                    KG: {Number(paySlipData?.original?.totalKg).toFixed(2) || 0}
                  </td>
                  <td className="border border-black px-2 py-2">
                    BY: {paySlipData?.original?.shipmentBy}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-2">
                    DEBIT:{" "}
                    <NumberFormat
                      thousandSeparator={true}
                      value={paySlipData?.original?.totalAmount || 0}
                      displayType={"text"}
                      decimalScale={2}
                    />
                    /-
                  </td>
                  <td className="border border-black px-2 py-2">
                    CREDIT:{" "}
                    <NumberFormat
                      thousandSeparator={true}
                      value={sumBy(
                        paySlipData?.original?.transactions,
                        (tran) => Number(tran.credit) || 0
                      )}
                      displayType={"text"}
                      decimalScale={2}
                      key={`credit-${paySlipData?.original?.shipmentNo}`}
                    />
                    /-
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-2">
                    DUE:{" "}
                    <NumberFormat
                      thousandSeparator={true}
                      value={
                        paySlipData?.original?.totalAmount -
                          sumBy(
                            paySlipData?.original?.transactions,
                            (tran) => Number(tran.credit) || 0
                          ) || 0
                      }
                      displayType={"text"}
                      decimalScale={2}
                      key={`due-${paySlipData?.original?.shipmentNo}`}
                    />
                    /-
                  </td>
                  <td className="border border-black px-2 py-2">
                    DISCOUNT:{" "}
                    <NumberFormat
                      thousandSeparator={true}
                      value={paySlipData?.original?.discount || 0}
                      displayType={"text"}
                      decimalScale={2}
                    />
                    /-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className=" border px-3 py-1 mx-auto w-64 mt-2 border-black rounded-sm hover:bg-gray-200 hover:border-blue-600 mb-2">
              {fileUploadCell(paySlipData)}
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-md">
              {paySlipData?.original?.transactions?.length > 0 &&
                paySlipData?.original?.transactions?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-blue-500 hover:bg-gray-100 text-black shadow-md text-center py-1 rounded-lg px-3"
                  >
                    <div className="text-center font-semibold border-b border-black py-1">
                      <button
                        onClick={() =>
                          handleDeletePayslip(i, paySlipData?.index)
                        }
                        disabled={
                          paySlipData?.original?.approval === "approval"
                        }
                        className="bg-red-600 hover:bg-red-700 mb-1 text-white uppercase inline-flex items-center text-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded  focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                      >
                        Delete Payslip
                      </button>
                    </div>

                    <div className="grid grid-cols-2 border-b border-black text-sm">
                      <div className="border-r border-black p-1 text-left">
                        <select
                          className={`text-left uppercase whitespace-no-wrap text-sm leading-5  block w-full px-0.5 py-1  text-gray-700 bg-white border rounded-md !appearance-none focus:ring-blue-300 focus:outline-none `}
                          value={item?.trasferredBy}
                          // onKeyDown={(e) => handleKeyDown(e, cellInfo)}
                          onChange={(e) =>
                            handleTrasferredBy(
                              paySlipData.index,
                              i,
                              e.target.value
                            )
                          }
                          defaultValue={item?.trasferredBy}
                          key={i}
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
                      </div>
                      <div className="p-1 text-left">
                        TRX DATE:{" "}
                        {`${(() => {
                          const [d, m, y] = item?.trxDate
                            .split(",")[0]
                            .split(" ");
                          return `${d} ${monthMap[m] || m} ${y}`;
                        })()}`}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 border-b border-black text-sm">
                      <div className="border-r border-black p-1 text-left">
                        AMOUNT:{" "}
                        <NumberFormat
                          thousandSeparator={true}
                          value={item.credit || 0}
                          displayType={"text"}
                          decimalScale={2}
                        />
                        /-
                      </div>
                      <div className="p-1 text-left">TRX ID: {item.trxId}</div>
                    </div>
                    {/* <div className="grid grid-cols-2 border-b border-black text-sm">
                      <div className="border-r border-black p-1 text-left">
                        Trasnfer By
                      </div>
                      
                    </div> */}

                    <div className="p-1 flex justify-center items-center">
                      <SlideshowLightbox
                        key={JSON.stringify(item)}
                        showControls
                        // open={showImg}
                        // onClose={() => setShowImg(false)}
                        // onOpen={() => setShowImg(true)}
                        showThumbnails={true}
                        backgroundColor="rgba(0, 0, 0, 0.034)" // Black with 70% opacity
                        modalClose="clickOutside"
                        animateThumbnails={true}
                        className="lightbox-custom space-y-1"
                        iconColor={"black"}
                        // className="container grid grid-cols-3 gap-2 mx-auto"
                      >
                        <img
                          key={item + i}
                          className=" mx-auto rounded h-20 w-10"
                          src={item?.payslip?.src || item?.payslip}
                        />
                      </SlideshowLightbox>
                    </div>
                    {/* <SlideshowLightbox
                      key={JSON.stringify(item)}
                      showControls
                      // open={showImg}
                      // onClose={() => setShowImg(false)}
                      // onOpen={() => setShowImg(true)}
                      showThumbnails={true}
                      backgroundColor="rgba(0, 0, 0, 0.034)" // Black with 70% opacity
                      modalClose="clickOutside"
                      animateThumbnails={true}
                      className="lightbox-custom space-y-1"
                      iconColor={"black"}
                      // className="container grid grid-cols-3 gap-2 mx-auto"
                    >
                      <img
                        key={item + i}
                        className=" mx-auto rounded h-20 w-10"
                        src={item?.payslip?.src || item?.payslip}
                      />
                    </SlideshowLightbox>
                    <div className="grid grid-cols-2 gap-2 text-left text-sm mt-2">
                      <p className="">TRX DATE: {item.trxDate}</p>
                      <p>TRX ID: {item.trxId}</p>
                      <div>
                        <select
                          className={`uppercase whitespace-no-wrap text-sm leading-5  text-center block w-full px-4 py-1 my-2  text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 `}
                          value={item?.trasferredBy}
                          // onKeyDown={(e) => handleKeyDown(e, cellInfo)}
                          onChange={(e) =>
                            handleTrasferredBy(
                              paySlipData.index,
                              i,
                              e.target.value
                            )
                          }
                          defaultValue={item?.trasferredBy}
                          key={i}
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
                      </div>
                      <p>CREDIT: {item.credit}</p>
                    </div> */}
                  </div>
                ))}
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer className={"flex justify-center space-x-2 items-center"}>
          <button
            onClick={() => {
              setIsOpen(false);
              setPaySlipData(null);
            }}
            className="bg-red-600 hover:bg-red-700 text-white uppercase inline-flex items-center text-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded  focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          >
            Close
          </button>
          <button
            onClick={(e) =>
              handleOnSubmit(paySlipData?.original, paySlipData._index)
            }
            className="uppercase inline-flex items-center text-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            // disabled={
            //   // loading || cell?.original?.approval === "approved"
            //   // ||
            //   // !row._original?.transactions > 0 ||
            //   // isUndefined(
            //   //   row._original?.transactions[row._index]?.["trasferredBy"]
            //   // )
            // }
          >
            {loading ? (
              <>
                <SpingSvgIcon />
                Updating
              </>
            ) : (
              "Update"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentSlipModal;
