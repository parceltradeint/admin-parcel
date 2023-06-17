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
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const BillFormSegment = (props) => {
  const { editMode } = props;
  const [data, setData] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(editMode ? editMode : null);
  const [loading, setLoading] = useState(false);
  const [aditionalInfo, setAditionalInfo] = useState({});
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
        .post("/api/bill", { ...newData })
        .then((res) => {
          successAlert("Successfully Save");
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => setLoading(false));
    } else {
      delete newData?._id;
      await axios
        .patch("/api/bill", { id: editMode?._id, data: { ...newData } })
        .then((res) => {
          successAlert("Successfully Save");
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (editMode) {
      setData(editMode?.data);
      setCustomerInfo(editMode);
    }
  }, [editMode]);

  if (loading) {
    return <OverlayLoading />;
  }
  return (
    <div>
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
              >
                Delete
              </button>
            </div>
          </Section>
        </>
      )}
    </div>
  );
};

export default BillFormSegment;
