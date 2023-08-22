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
    const newInfo = {
      ...customerInfo,
      ...aditionalInfo,
      data: data,
    };
    if (router.query.type === "packing") {
      generatePackingPDF(newInfo);
    } else {
      generatePDF(newInfo);
    }
  };
  const save = async () => {
    setLoading(true);
    const newData = {
      ...customerInfo,
      ...aditionalInfo,
      data: data,
    };
    if (!editMode) {
      (newData["month"] = monthNames[new Date().getMonth()]),
        (newData["year"] = `${new Date().getFullYear()}`),
        (newData["invoiceNumber"] = Date.now()),
        (newData["type"] = type),
        await axios
          .post(`/api/${router?.query?.type}`, { ...newData })
          .then((res) => {
            successAlert("Successfully Saved.");
            router.push(
              `/bills/${type}/month/${newData.month}/${newData.shipmentBy}/${newData.shipmentNo}`
            );
          })
          .catch((err) => {
            console.log("err", err);
            errorAlert("Something went wrong!");
          })
          .finally(() => setLoading(false));
    } else {
      delete newData?._id;
      await axios
        .patch(`/api/${router?.query?.type}`, {
          id: editMode?._id,
          data: { ...newData },
        })
        .then((res) => {
          successAlert("Successfully Update");
          router.push(
            `/bills/customer/month/${editMode.month}/${editMode.shipmentBy}/${editMode.shipmentNo}`
          );
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }

    localStorage.setItem("suggestInput", JSON.stringify(suggestionData));
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
              type={router.query.type}
            />
            <Section>
              <div className="flex space-x-2 justify-center mt-2">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                  onClick={downloadPDF}
                >
                  View PDF
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                  onClick={save}
                >
                  {!editMode ? "Save" : "Update"}
                </button>
                {editMode && (
                  <button
                    type="button"
                    onClick={deleteData}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
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
