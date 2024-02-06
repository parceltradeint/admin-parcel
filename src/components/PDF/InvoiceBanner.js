import { parcelLogo, wechat } from "./image";

export default function headerBanner(type) {
  return {
    style: "section",
    margin: [0, 5, 0, 0],
    table: {
      widths: ["*"],
      body: [
        [
          {
            text: [{ text: type || "SHIPMENT BILL\n", fontSize: 15 }],
            fillColor: "#1586D5",
            color: "#FFFFFF",
            alignment: "center",
            bold: true,
          },
        ],
      ],
    },
    layout: "noBorders",
  };
}
