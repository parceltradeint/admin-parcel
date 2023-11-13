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
import { MyDocument } from "../PDF/makeNewPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const BillFormSegment = (props) => {
  const { editMode } = props;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(editMode ? editMode : null);
  const [loading, setLoading] = useState(false);
  const [aditionalInfo, setAditionalInfo] = useState({});
  const [suggestionData, setSuggestionData] = useState([]);
  let type =
    router?.query?.type == "outbound"
      ? "customer"
      : router?.query?.type == "inbound"
      ? "cnf"
      : router?.query?.type == "packing"
      ? "packing"
      : "";
  const downloadPDF = () => {
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
    if (router.query.type === "packing") {
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
    const newData = {
      ...customerInfo,
      ...aditionalInfo,
      data: data,
      totalKg: sumBy(data, (item) => Number(item.kg || 0)),
      totalCtn: data?.filter((item) => item?.ctn?.length > 1)?.length,
      totalAmount:
        sumBy(data, (item) => Number(item.totalAmount || 0)) +
        Number(aditionalInfo?.rmb?.qty || 0) *
          Number(aditionalInfo?.rmb?.rate || 0),
      totalDueBill:
        sumBy(data, (item) => Number(item.totalAmount || 0)) +
        Number(aditionalInfo?.rmb?.qty || 0) *
          Number(aditionalInfo?.rmb?.rate || 0) +
        Number(aditionalInfo?.due || 0) -
        Number(aditionalInfo?.paid || 0),
    };
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
      icon: "warning",
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
                successAlert("Successfully Saved.");
                router.push(
                  `/bills/${resP.value}/month/${newData.month}/${newData.shipmentBy}/${newData.shipmentNo}`
                );
              })
              .catch((err) => {
                console.log("err", err);
                errorAlert("Something went wrong!");
              })
              .finally(async () => {
                if (newData?.isNew) {
                  const newCustomer = {
                    customerName: newData?.customerName,
                    customerPhone: newData?.phone,
                    shipmentBy: newData?.shipmentBy,
                    customerAddress: newData?.address,
                    remarks: newData?.remarks,
                    listed: "true",
                  };
                  await axios.post(`/api/customers`, { ...newCustomer });
                }
                setLoading(false);
              });
        } else {
          delete newData?._id;
          await axios
            .patch(`/api/${selectedType}`, {
              id: editMode?._id,
              data: { ...newData },
            })
            .then((res) => {
              successAlert("Successfully Update");
              router.push(
                `/bills/${resP.value}/month/${editMode.month}/${editMode.shipmentBy}/${editMode.shipmentNo}`
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
    setLoading(true);
    if (editMode) {
      await axios
        .delete(`/api/${router?.query?.type}?id=` + editMode?._id)
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

  if (loading) {
    return <PlaceHolderLoading loading={true} />;
  }

  return (
    <Section>
      {router?.query?.type === "packing" ? (
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

      {customerInfo &&
        customerInfo?.customerName &&
        customerInfo?.shipmentBy &&
        customerInfo?.shipmentNo && (
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
    </Section>
  );
};

export default BillFormSegment;
