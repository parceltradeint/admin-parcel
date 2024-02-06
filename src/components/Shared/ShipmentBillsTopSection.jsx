import React from "react";
import { convertTotalAmount } from "../PDF/InvoiceDef";

const ShipmentBillsTopSection = ({ dataInfo, shipmentNo }) => {
  return (
    <div className="flex flex-wrap justify-around uppercase">
      <p className="text-2xl text-black text-center">{`Shipment No- ${shipmentNo || ""}`}</p>
      <p className="text-2xl text-black text-center">
        Total Kg- {Number(dataInfo?.aggregationResult?.totalKg).toFixed(2) || ""}
      </p>
      <p className="text-2xl text-black text-center">
        Total CTN- {dataInfo?.aggregationResult?.totalCtn || ""}
      </p>
      <p className="text-2xl text-black text-center">{`Total Customers- ${dataInfo?.total || ""}`}</p>
      {dataInfo?.aggregationResult?.totalAmount && (
        <p className="text-2xl text-black text-center">
          Total Amount-{" "}
          {convertTotalAmount(Number(dataInfo?.aggregationResult?.totalAmount), 2) || ""}
        </p>
      )}
    </div>
  );
};

export default ShipmentBillsTopSection;
