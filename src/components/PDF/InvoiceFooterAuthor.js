import { formartDate } from "@/common/formartDate";

export default function InvoiceFooterAuthor() {
  return [
    {
      // margin: [0, 35, 0, 0],
      // border:[true, true, true, true],
      table: {
        widths: ["50%", "50%"],
        body: [
          [
            {
              text: "CUSTOMER SIGNATURE",
              alignment: "left",
              bold: true,
              // border: [true, true, true, false],
              // decoration: "overline",
              margin: [5, 40, 0, 0],
              border: [true, false, true, false],
            },
            {
              text: "AUTHORISE SIGNATURE",
              alignment: "right",
              bold: true,
              // decoration: "overline",
              // border: [true, true, true, false],
              margin: [0, 40, 10, -2],
              border: [false, false, true, false],
            },
          ],
        ],
      },
    },
    {
      // margin: [0, 5],
      table: {
        widths: ["50%", "50%"],
        body: [
          [
            {
              text: "https://facebook.com/parceltradeinternational",
              alignment: "left",
              link: "https://facebook.com/parceltradeinternational",
              bold: true,
              fontSize: 10,
              margin: [5, 0, 0, 0]
            },
            {
              text: "YOUR GETWAY TO CHINA",
              bold: true,
              fontSize: 10,
              alignment: "right",
              margin: [0, 0, 10, 0]
            },
          ],
        ],
      },
    },
  ];
}
