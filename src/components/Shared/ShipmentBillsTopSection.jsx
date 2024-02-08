import React from "react";
import { convertTotalAmount } from "../PDF/InvoiceDef";

const ShipmentBillsTopSection = ({ dataInfo, shipmentNo }) => {
  return (
    <div className="flex flex-wrap justify-around uppercase md:text-2xl text-base">
      <p className=" text-black text-center">{`Shipment No. ${shipmentNo || ""}`}</p>
      <p className=" text-black text-center">
        Kg- {Number(dataInfo?.aggregationResult?.totalKg).toFixed(2) || ""}
      </p>
      <p className=" text-black text-center">
        CTN- {dataInfo?.aggregationResult?.totalCtn || ""}
      </p>
      <p className=" text-black text-center">{`Customer- ${dataInfo?.total || ""}`}</p>
      {dataInfo?.aggregationResult?.totalAmount && (
        <p className=" text-black text-center">
          Amount-{" "}
          {convertTotalAmount(Number(dataInfo?.aggregationResult?.totalAmount), 2) || ""}
        </p>
      )}
    </div>
  );
};

export default ShipmentBillsTopSection;
