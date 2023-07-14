import React, { useEffect, useState } from "react";
import OverViewFrom from "./OverViewFrom";
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
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const BillFormSegment = (props) => {
  const { editMode } = props;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(editMode ? editMode : null);
  const [loading, setLoading] = useState(false);
  const [aditionalInfo, setAditionalInfo] = useState({});
  const [suggestionData, setSuggestionData] = useState([]);
  const downloadPDF = () => {
    // var win = window.open("", "_blank");
    const newInfo = {
      ...customerInfo,
      ...aditionalInfo,
      data: data,
    };
    generatePDF(newInfo);
  };

  const save = async () => {
    setLoading(true);
    const newData = {
      ...customerInfo,
      ...aditionalInfo,
      data: data,
      invoiceNumber: !editMode
        ? Math.floor(Math.random() * (100 - 1 + 1)) + 1
        : editMode?.invoiceNumber,
    };
    if (!editMode) {
      await axios
        .post(`/api/${router?.query?.type}`, { ...newData })
        .then((res) => {
          successAlert("Successfully Save");
          router.push(`/${router?.query?.type}`);
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
          successAlert("Successfully Save");
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
          router.push(`/${router?.query?.type}`);
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
      <OverViewFrom
        editMode={editMode}
        setCustomerInfo={setCustomerInfo}
        customerInfo={customerInfo}
      />
      {customerInfo && (
        <>
          <BillFormDetails
            data={data}
            setData={setData}
            aditionalInfo={aditionalInfo}
            setAditionalInfo={setAditionalInfo}
            setSuggestionData={setSuggestionData}
          />
          <Section>
            <div className="flex space-x-2 justify-center mt-2">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                onClick={downloadPDF}
              >
                View Inovice
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
