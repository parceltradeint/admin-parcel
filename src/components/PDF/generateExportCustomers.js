import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,
import { cre } from "pdfmake";
export const generateExportCustomers = (data) => {
  let renderData = [];
  if (data) {
    let newData = [...data].map((item, i) => {
      return [
        {
          text: `${i + 1}`,
          fontSize: 10,
          // color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: `${item?.customerId || ""}`,
          fontSize: 10,
          alignment: "left",
        },
        {
          text: `${item?.customerName || ""}`,
          fontSize: 10,
          alignment: "left",
        },
        {
          text: `${item?.customerPhone || ""}`,
          fontSize: 10,
        },
        {
          text: `${item?.customerAddress || ""}`,
          fontSize: 10,
        },
        {
          text: `${formartDate(item?.created) || ""}`,
          fontSize: 10,
        },
        {
          text: `${item?.createdBy || ""}`,
          fontSize: 10,
        },
      ];
    });

    renderData = [...newData];
  }

  let docDefinition = {
    info: {
      title: `CUSTOMERS LISTS- ${formartDate(new Date())}`,
      author: "Parcel",
      subject: "",
    },
    content: [
      {
        style: ["headerStrip"],
        margin: [0, 0, 0, 4],
        columns: [
          {
            alignment: "left",
            text: `CUSTOMERS LIST`,
          },
          {
            alignment: "right",
            text: `${formartDate(new Date())}`,
          },
        ],
      },
      {
        margin: [0, 0, 0, 0],
        table: {
          widths: ["*"],
          body: [
            [
              {
                border: [true, true, true, true],
                columns: [
                  {
                    alignment: "left",
                    width: 60,
                    image: parcelLogo,
                  },
                  {
                    alignment: "left",
                    text: [
                      "P",
                      { text: "arce", color: "red" },
                      "l ",
                      "Trade International",
                    ],
                    fontSize: 30,
                    bold: true,
                    margin: [0, 10, 0, 0],
                  },
                  {
                    alignment: "right",
                    width: 60,
                    image: contact27,
                  },
                ],
              },
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
      },
      // {
      //   table: {
      //     widths: ["13%", "73%", "14%"],
      //     body: [
      //       [
      //         {
      //           stack: [
      //             {
      //               image: wechat,
      //               width: 50,
      //               margin: [10, 0, 0, 0],
      //             },
      //             {
      //               text: "WeChat",
      //               color: "#333",
      //               alignment: "center",
      //               fontSize: 9,
      //               margin: [4, 4, 0, 0],
      //             },
      //           ],
      //         },
      //         {
      //           stack: [
      //             {
      //               text: "H-2553, Sayednagor, Vatara, Gulshan-2, Dhaka-1212.\n",
      //               fontSize: 15,
      //               border: [false, true, false, true],
      //             },
      //             {
      //               text: "Cell: 01879314050, 01521584929\n",
      //               fontSize: 15,
      //               margin: [0, 5, 0, 0],
      //             },
      //           ],
      //           fillColor: "#555555",
      //           color: "#FFFFFF",
      //           bold: true,
      //           alignment: "center",
      //           margin: [0, 10, 0, 0],
      //         },

      //         {
      //           stack: [
      //             {
      //               image: whatsApp,
      //               width: 53,
      //               margin: [10, 0, 0, 0],
      //             },
      //             {
      //               text: "WhatsApp",
      //               color: "#333",
      //               alignment: "center",
      //               fontSize: 9,
      //               margin: [4, 0, 0, 0],
      //             },
      //           ],
      //         },
      //       ],
      //     ],
      //   },
      //   layout: "borders",
      // },
      {
        style: "section",
        margin: [0, 0, 0, 0],
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: [{ text: `${"CUSTOMERS LISTS"}\n`, fontSize: 20 }],
                fillColor: "#1586D5",
                color: "#FFFFFF",
                alignment: "center",
                bold: true,
              },
            ],
          ],
        },
        layout: "noBorders",
      },

      // {
      //   table: {
      //     widths: ["*"],
      //     margin: [0, 0, 0, 10],
      //     body: [
      //       [
      //         {
      //           stack: [
      //             {
      //               text: "ACCOUNT LEDGER\n",
      //               fontSize: 20,
      //               bold: true,
      //               border: [false, true, false, true],
      //             },
      //             {
      //               text: `FROM: ${info.shipmentNo}\n`,
      //               fontSize: 15,
      //               margin: [0, 5, 0, 0],
      //             },
      //             {
      //               text: `ACCOUNT NAME: (${info?.customerId}) ${info?.customerName}\n`,
      //               fontSize: 15,
      //               margin: [0, 5, 0, 0],
      //             },
      //           ],
      //           // fillColor: "#555555",
      //           // color: "#FFFFFF",
      //           bold: true,
      //           alignment: "center",
      //           margin: [0, 10, 0, 0],
      //         },
      //       ],
      //     ],
      //   },
      //   layout: "borders",
      // },

      {
        style: "summartTable",
        table: {
          headerRows: 1,
          dontBreakRows: true,
          // keepWithHeaderRows: 1,
          widths: ["5%", "15%", "15%", "15%", "30%", "12%", "10%"],
          body: [
            [
              {
                text: "SL",
                style: "tableHeader",
              },
              {
                text: "ID",
                style: "tableHeader",
              },
              {
                text: "NAME",
                style: "tableHeader",
              },
              {
                text: "PHONE",
                style: "tableHeader",
              },
              {
                text: "ADDRESS",
                style: "tableHeader",
              },
              {
                text: "CREATED",
                style: "tableHeader",
              },
              {
                text: "CREATED BY",
                style: "tableHeader",
              },
            ],
            //   ...foremanDataDetails,
            ...renderData,
            // [
            //   { text: "TOTAL", style: "tableFooter" },
            //   { text: "", style: "tableFooter" },
            //   {
            //     text: `${sumBy(info?.data, (val) =>
            //       Number(val?.totalAmount || 0)
            //     )}`,
            //     style: "tableFooter",
            //   },
            //   {
            //     text: `${sumBy(info?.data, (val) => Number(val?.credit || 0))}`,
            //     style: "tableFooter",
            //   },
            //   {
            //     text: `${sumBy(info?.data, (val) =>
            //       Number(val?.balance || 0)
            //     )}`,
            //     style: "tableFooter",
            //   },
            // ],
          ],
        },
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 1 : 1;
          },
          vLineWidth: function (i, node) {
            return i === 0 || i === node.table.widths.length ? 1 : 1;
          },
          hLineColor: function (i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "gray";
          },
          vLineColor: function (i, node) {
            return i === 0 || i === node.table.widths.length ? "black" : "gray";
          },
        },
      },
    ],

    pageSize: "A4",

    defaultStyle: {
      border: [true, true, true, true], // Specify the border for all sides
      columnGap: 15,
    },
    layout: {
      defaultBorder: true, // Apply the default border to all content elements
    },
    styles: {
      headerStrip: {
        fontSize: 8,
      },
      summartTable: {
        margin: [0, 10, 0, 0],
        fontSize: 8,
        alignment: "center",
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "#FFFFFF",
        fillColor: "#555555",
        alignment: "center",
      },
      tableFooter: {
        bold: true,
        fontSize: 10,
        color: "#FFFFFF",
        fillColor: "#555555",
        alignment: "center",
      },
      nameStyle: {
        color: "red",
      },
    },
  };

  // const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  var win = window.open("", "_blank");
  pdfMake.createPdf(docDefinition).open(
    {
      filename: "Nayem Khan.pdf",
      options: {
        windowTitle: "My Document",
      },
    },
    win
  );
};

function convertNumberToWords(number) {
  var words = [
    "",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
  ];
  var tens = [
    "",
    "",
    "TWENTY",
    "THIRTY",
    "FORTY",
    "FIFTY",
    "SIXTY",
    "SEVENTY",
    "EIGHTY",
    "NINETY",
  ];

  if (number == 0) {
    return "ZERO";
  }

  if (number < 0) {
    return "MINUS " + convertNumberToWords(Math.abs(number));
  }

  var wordsArr = [];

  if (Math.floor(number / 10000000) > 0) {
    wordsArr.push(
      convertNumberToWords(Math.floor(number / 10000000)) + " CRORE"
    );
    number %= 10000000;
  }

  if (Math.floor(number / 100000) > 0) {
    wordsArr.push(convertNumberToWords(Math.floor(number / 100000)) + " LAKH");
    number %= 100000;
  }

  if (Math.floor(number / 1000) > 0) {
    wordsArr.push(
      convertNumberToWords(Math.floor(number / 1000)) + " THOUSAND"
    );
    number %= 1000;
  }

  if (Math.floor(number / 100) > 0) {
    wordsArr.push(convertNumberToWords(Math.floor(number / 100)) + " HUNDRED");
    number %= 100;
  }

  if (number > 0) {
    // if (wordsArr.length != 0) {
    //   wordsArr.push("and");
    // }

    if (number < 20) {
      wordsArr.push(words[number]);
    } else {
      wordsArr.push(tens[Math.floor(number / 10)]);
      wordsArr.push(words[number % 10]);
    }
  }
  return wordsArr.join(" ");
}

export function convertBengaliToEnglishNumber(bengaliNumber) {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let englishNumber = bengaliNumber;

  // Replace Bengali digits with English digits
  for (let i = 0; i < bengaliDigits.length; i++) {
    englishNumber = englishNumber.replace(
      new RegExp(bengaliDigits[i], "g"),
      englishDigits[i]
    );
  }

  return englishNumber;
}
