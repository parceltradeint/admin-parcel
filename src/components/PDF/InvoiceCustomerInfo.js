import { formartDate } from "@/common/formartDate";

export default function invoiceCustomerInfo(info, type) {
  const infoDetails = [
    {
      margin: [0, 5, 0, 0],
      fontSize: 10,
      table: {
        widths: ["15%", "50%", "15%", "20%"],
        body: [
          [
            {
              text: "NAME",
              alignment: "left",
              fillColor: "#555555",
              color: "#FFFFFF",
              bold: true,
            },
            `${info?.customerName?.toUpperCase() || ""}`,
            {
              text: "DATE",
              alignment: "left",
              fillColor: "#555555",
              color: "#FFFFFF",
              bold: true,
            },
            { text: `${formartDate(new Date())}`, alignment: "left" },
            // { text: `${info?.phone}`}
          ],
        ],
      },
    },
    {
      margin: [0, 0, 0, 0],
      fontSize: 10,
      table: {
        widths: ["15%", "50%", "15%", "20%"],
        body: [
          [
            {
              text: "SHIPMENT",
              alignment: "left",
              fillColor: "#555555",
              color: "#FFFFFF",
              bold: true,
              border: [true, false, false, true],
            },
            {
              text: `BY ${info?.shipmentBy?.toUpperCase() || ""}`,
              border: [true, false, false, true],
            },
            {
              text: "REPORTING",
              alignment: "left",
              fillColor: "#555555",
              color: "#FFFFFF",
              border: [true, false, false, true],
              bold: true,
            },
            {
              text: `${info?.reporting?.toUpperCase() || ""}`,
              alignment: "left",
              border: [true, false, true, true],
            },
          ],
        ],
      },
    },
    {
      margin: [0, 0, 0, 0],
      fontSize: 10,
      table: {
        widths: ["15%", "50%", "15%", "20%"],
        body: [
          [
            {
              text: `${type === "Challan" ? "MOBILE" : "ADDRESS"}`,
              alignment: "left",
              fillColor: "#555555",
              color: "#FFFFFF",
              bold: true,
              border: [true, false, false, true],
            },
            {
              text: `${type === "Challan" ? info?.customerPhone : info?.customerAddress?.toUpperCase() || ""}`,
              border: [true, false, false, true],
            },
            {
              text: "SHIPMENT NO.",
              alignment: "left",
              fillColor: "#555555",
              color: "#FFFFFF",
              bold: true,
              border: [true, false, false, true],
            },
            {
              text: `${info?.shipmentNo || ""}`,
              alignment: "left",
              border: [true, false, true, true],
            },
          ],
        ],
      },
    },
    {
      fontSize: 10,
      margin: [0, 0, 0, 5],
      // border:[false, false, false, false],
      table: {
        widths: ["14.5%", "85.5%"],
        body: [
          [
            {
              text: `${type === "Challan" ? "ADDRESS" : "REMARKS"}`,
              alignment: "left",
              fillColor: "#555555",
              color: "#FFFFFF",
              bold: true,
              border: [true, false, true, true],
              margin: [0, -2, 0, 0],
            },
            {
              text: `${type === "Challan" ? info?.customerAddress?.toUpperCase(): info?.remarks?.toUpperCase()}`,
              color: `${type === "Challan" ? "black" : "red"}`,
              bold: true,
              border: [false, false, true, true],
            },
          ],
        ],
      },
    },
  ];
  return infoDetails;
}
