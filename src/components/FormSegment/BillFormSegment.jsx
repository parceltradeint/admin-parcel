/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import OverViewForm from "./OverViewForm";
import BillFormDetails from "./BillFormDetails";
import Section from "@/common/Section";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { docDefinition, generatePDF } from "../PDF/InvoiceDef";
import axios from "axios";
import { errorAlert, successAlert } from "@/common/SweetAlert";
import OverlayLoading from "@/common/OverlayLoading";
import { Router, useRouter } from "next/router";
import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import { monthNames } from "../Module/FolderComponents";
import PackingOverviewForm from "./PackingOverviewForm";
import { generatePackingPDF } from "../PDF/packingDef";
import Swal from "sweetalert2";
import { isEmpty, sumBy } from "lodash";
import useSound from "use-sound";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const BillFormSegment = (props) => {
  const { editMode } = props;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(editMode ? editMode : null);
  const [loading, setLoading] = useState(false);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [aditionalInfo, setAditionalInfo] = useState({});
  const [oldAditionalInfo, setOldAditionalInfo] = useState(null);
  const [suggestionData, setSuggestionData] = useState([]);
  const [deleteSoundPlay] = useSound("/assets/sounds/deleted.mp3", {
    volume: 0.45,
  });
  const [saveSoundPlay] = useSound("/assets/sounds/save.mp3", { volume: 0.45 });

  let type = router?.query?.type.includes("outbound")
    ? "customer"
    : router?.query?.type.includes("inbound")
    ? "cnf"
    : router?.query?.type.includes("packing")
    ? "packing"
    : "";
  const downloadPDF = () => {
    // var win = window.open("", "_blank");
    const newData = [...data];
    if (
      !isEmpty(aditionalInfo?.rmb) &&
      aditionalInfo?.rmb?.qty &&
      aditionalInfo?.rmb?.rate
    ) {
      newData.push({
        des: aditionalInfo?.rmb?.des || "REPACKING CHARGE",
        qty: aditionalInfo?.rmb?.qty,
        rate: aditionalInfo?.rmb?.rate,
        totalAmount:
          Number(aditionalInfo?.rmb?.qty) * Number(aditionalInfo?.rmb?.rate) ||
          0,
      });
    }
    const newInfo = {
      ...customerInfo,
      ...aditionalInfo,
      data: newData,
    };
    if (type === "packing") {
      generatePackingPDF(newInfo, "Packing List");
    } else {
      generatePDF(newInfo);
    }
  };

  const downloadChallan = () => {
    // var win = window.open("", "_blank");
    const newData = [...data];
    if (!isEmpty(aditionalInfo?.rmb)) {
      newData.push({
        des: aditionalInfo?.rmb?.des || "RMB",
        qty: aditionalInfo?.rmb?.qty,
        rate: aditionalInfo?.rmb?.rate,
        totalAmount:
          Number(aditionalInfo?.rmb?.qty) * Number(aditionalInfo?.rmb?.rate) ||
          0,
      });
    }
    const newInfo = {
      ...customerInfo,
      ...aditionalInfo,
      data: newData,
    };
    generatePackingPDF(newInfo, "Challan");
  };

  const save = async () => {
    saveSoundPlay();

    const totalDueBill =
      sumBy(data, (item) => Number(item.totalAmount || 0)) +
      Number(aditionalInfo?.rmb?.qty || 0) *
        Number(aditionalInfo?.rmb?.rate || 0) +
      Number(aditionalInfo?.due || 0) -
      Number(aditionalInfo?.paid || 0);
    const totalAmount =
      sumBy(data, (item) => Number(item.totalAmount || 0)) +
      Number(aditionalInfo?.rmb?.qty || 0) *
        Number(aditionalInfo?.rmb?.rate || 0);
    const newData = {
      ...customerInfo,
      ...aditionalInfo,
      data: data,
      totalKg: sumBy(data, (item) => Number(item.kg || 0)),
      totalCtn: data?.filter((item) => item?.ctn?.length > 1)?.length,
      totalAmount: totalAmount,
      totalDueBill,
      balance: totalAmount - Number(customerInfo?.credit || 0),
    };

    // if (
    //   oldAditionalInfo?.customerId &&
    //   oldAditionalInfo?.balance &&
    //   type == "customer"
    // ) {
    //   const newOldAditionalData = {
    //     balance: oldAditionalInfo.balance,
    //     shipmentBy: oldAditionalInfo.shipmentBy,
    //     shipmentNo: oldAditionalInfo.shipmentNo,
    //     year: oldAditionalInfo.year,
    //     month: oldAditionalInfo.month,
    //     customerId: oldAditionalInfo.customerId,
    //   }
    //   if (oldAditionalInfo?.oldAditionalInfo) {
    //     newData["oldAditionalInfo"] = [...oldAditionalInfo?.oldAditionalInfo, {...newOldAditionalData}];
    //   } else {
    //     newData["oldAditionalInfo"] = [{...newOldAditionalData}];
    //   }
    // }

    const options = ["customer", "cnf", "packing"];

    Swal.fire({
      title: `ARE YOU ${
        editMode ? "UPDATE" : "SAVE"
      } FOR ${type.toUpperCase()} INVOICE`,
      input: "select",
      inputOptions: {
        "": "Select an option", // Empty value
        ...options.reduce((obj, option) => {
          obj[option] = option;
          return obj;
        }, {}),
      },
      inputValue: type,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve("You need to select an option");
          }
        });
      },
      didOpen: () => {
        // Apply custom styles to the select options
        const optionElements = Swal.getPopup().querySelectorAll(
          ".swal2-select option"
        );
        optionElements.forEach((option) => {
          option.classList.add("uppercase");
        });
      },
      didRender: () => {
        const selectElement = document.querySelector(".swal2-select");
        selectElement.addEventListener("change", (event) => {
          const selectedOption = event.target.value;
          Swal.update({
            title: `ARE YOU ${
              editMode ? "UPDATE" : "SAVE"
            } FOR ${selectedOption.toUpperCase()} INVOICE`,
          });
        });
      },
      icon: "success",
      confirmButtonColor: "#006EB8",
      confirmButtonText: `Confirm`,
      allowOutsideClick: false,
      // cancelButtonText: "No",
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async (resP) => {
      if (resP.isConfirmed) {
        let selectedType =
          resP.value == "customer"
            ? "outbound"
            : resP.value == "cnf"
            ? "inbound"
            : resP.value == "packing"
            ? "packing"
            : "";
        setLoading(true);
        if (!editMode) {
          (newData["month"] = monthNames[new Date().getMonth()]),
            (newData["year"] = `${new Date().getFullYear()}`),
            (newData["invoiceNumber"] = Date.now()),
            (newData["type"] = resP.value),
            await axios
              .post(`/api/${selectedType}`, { ...newData })
              .then((res) => {
                console.log("res", res);
              })
              .catch((err) => {
                console.log("err", err);
                errorAlert("Something went wrong!");
              })
              .finally(async () => {
                // if (
                //   oldAditionalInfo?.customerId &&
                //   oldAditionalInfo?.balance &&
                //   resP.value == "customer"
                // ) {
                //   const updateData = {
                //     ...oldAditionalInfo,
                //     currentDue: oldAditionalInfo.balance,
                //     balance: 0,
                //     ref: {
                //       balance: newData.balance,
                //       shipmentBy: newData.shipmentBy,
                //       shipmentNo: newData.shipmentNo,
                //       year: newData.year,
                //       month: newData.month,
                //       customerId: newData.customerId,
                //       oldBalance: oldAditionalInfo.balance,
                //     },
                //   }
                //   delete updateData?._id;
                //   await axios
                //     .patch(`/api/${selectedType}`, {
                //       id: oldAditionalInfo?._id,
                //       data: {...updateData},
                //     })
                //     .then((res) => res)
                //     .catch((err) => console.log("error", err));
                // }
                setLoading(false);
                successAlert("Successfully Saved.");
                router.push(
                  `/bills/${resP.value}/month/${newData.month}/${
                    newData.shipmentBy
                  }/${newData.shipmentNo}/?year=${
                    router?.query?.year || newData["year"]
                  }`
                );
              });
        } else {
          delete newData?._id;

          let response;
          if (resP.value != newData["type"]) {
            response = new Promise((resolve, reject) => {
              axios
                .delete(
                  `/api/${
                    newData["type"] === "customer"
                      ? "outbound"
                      : newData["type"] === "cnf"
                      ? "inbound"
                      : newData["type"]
                  }?id=` + editMode?._id
                )
                .then((res) => res)
                .catch((err) => err);
              
              axios
                .post(`/api/${selectedType}`, { ...newData, type: resP.type })
                .then((res) => resolve(res))
                .catch((err) => reject(err));
            });
          } else {
            response = new Promise((resolve, reject) => {
              axios
                .patch(`/api/${selectedType}`, {
                  id: editMode?._id,
                  data: { ...newData },
                })
                .then((res) => resolve(res))
                .catch((err) => reject(err));
            });
          }

          response
            .then((res) => {
              successAlert("Successfully Update");
              router.push(
                `/bills/${resP.value}/month/${editMode.month}/${
                  editMode.shipmentBy
                }/${editMode.shipmentNo}/?year=${
                  router?.query?.year || editMode?.year
                }`
              );
            })
            .catch((err) => {
              errorAlert("Something went wrong!");
            })
            .finally(() => setLoading(false));
        }

        localStorage.setItem("suggestInput", JSON.stringify(suggestionData));
      } else {
        return;
      }
    });
  };

  const deleteData = async () => {
    deleteSoundPlay();
    errorAlert(`Delete`).then(async (res) => {
      if (res.isConfirmed) {
        setLoading(true);
        if (editMode) {
          await axios
            .delete(
              `/api/${
                type === "customer"
                  ? "outbound"
                  : type === "cnf"
                  ? "inbound"
                  : type
              }?id=` + editMode?._id
            )
            .then((res) => {
              successAlert("Successfully Deleted");
              router.push(
                `/bills/customer/month/${editMode.month}/${editMode.shipmentBy}/${editMode.shipmentNo}`
              );
            })
            .catch((err) => {
              console.log("err", err);
              errorAlert("Something went wrong!");
            })
            .finally(() => setLoading(false));
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    if (editMode) {
      setData(editMode?.data);
      setCustomerInfo(editMode);
      setAditionalInfo({
        due: editMode?.due,
        paid: editMode?.paid,
        rmb: editMode?.rmb,
      });
    }
  }, [editMode]);

  useEffect(() => {
    if (
      customerInfo?.customerId &&
      router.pathname?.includes("new") &&
      type !== "packing"
    ) {
      async function fetchCustomer() {
        setLoadingUserDetails(true);
        await axios
          .get(`/api/${type === "cnf" ? "inbound" : "customers-bills"}`, {
            params: { customerId: customerInfo.customerId },
          })
          .then((res) => {
            // setOldAditionalInfo({ ...res.data.res });
            let balance = res.data.totalBalance || 0;
            if (balance >= 0) {
              setAditionalInfo({ due: balance });
            } else {
              setAditionalInfo({
                paid: Math.abs(balance),
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
            // errorAlert("Something went wrong!");
          })
          .finally(() => setLoadingUserDetails(false));
      }
      fetchCustomer();
    }
  }, [customerInfo?.customerId]);

  if (loading) {
    return <PlaceHolderLoading loading={true} />;
  }

  return (
    <Section>
      {type === "packing" ? (
        <PackingOverviewForm
          editMode={editMode}
          setCustomerInfo={setCustomerInfo}
          customerInfo={customerInfo}
        />
      ) : (
        <OverViewForm
          editMode={editMode}
          setCustomerInfo={setCustomerInfo}
          customerInfo={customerInfo}
        />
      )}

      {!loadingUserDetails &&
        customerInfo &&
        customerInfo?.customerName &&
        customerInfo?.shipmentBy &&
        customerInfo?.shipmentNo &&
        customerInfo?.customerAddress && (
          <>
            <BillFormDetails
              data={data}
              setData={setData}
              aditionalInfo={aditionalInfo}
              setAditionalInfo={setAditionalInfo}
              setSuggestionData={setSuggestionData}
              type={type}
            />
            <Section>
              <div className="flex space-x-2 justify-center mt-2 ">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 uppercase"
                  onClick={downloadPDF}
                >
                  {/* <PDFDownloadLink
                    document={<MyDocument />}
                    fileName="somename.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "View Bill"
                    }
                  </PDFDownloadLink> */}
                  {type === "packing" ? "View PDF" : "View Bill"}
                </button>
                {type === "customer" && (
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 uppercase"
                    onClick={downloadChallan}
                  >
                    View Challan
                  </button>
                )}

                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 uppercase"
                  onClick={save}
                >
                  {!editMode ? "Save" : "Update"}
                </button>
                {editMode && (
                  <button
                    type="button"
                    onClick={deleteData}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 uppercase"
                  >
                    Delete
                  </button>
                )}
              </div>
            </Section>
          </>
        )}
      {loadingUserDetails && <PlaceHolderLoading loading={true} />}
    </Section>
  );
};

export default BillFormSegment;
