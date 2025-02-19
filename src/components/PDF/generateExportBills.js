import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,
import { cre } from "pdfmake";
import HeaderOfPDF from "./InvoiceHeader";
import { stylesVals } from "./InvoiceDef";
export const generateExportBills = (data) => {
  let renderData = [];

  const calculationDueBill = (item) => {
    if (item.totalDueBill) {
      return Number(item.totalDueBill).toFixed(2);
    } else {
      let total =
        sumBy(item.data, (v) => Number(v.totalAmount || 0)) +
        Number(item?.rmb?.qty || 0) * Number(item?.rmb?.rate || 0);
      // +
      // Number(item?.due || 0) -
      // Number(item?.paid || 0);
      return total.toFixed(2);
    }
  };

  const convertTotalAmount = (val, toFixed) => {
    return convertBengaliToEnglishNumber(
      val.toLocaleString("bn", {
        minimumFractionDigits: toFixed || 2,
      })
    );
  };

  if (data) {
    let newData = [...data].map((item, i) => {
      return [
        {
          text: `${i + 1}`,
          fontSize: 9,
          // color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: `${item?.customerName}`,
          fontSize: 9,
          alignment: "left",
          // color: `${isBrand ? "red" : "black"}`,
        },
        // {
        //   text: `${item?.shipmentBy || ""}`,
        //   fontSize: 9,
        //   alignment: "left",
        // },
        // {
        //   text: `${Number(item?.totalKg).toFixed(2) || ""}`,
        //   fontSize: 9,
        //   alignment: "left",
        // },
        // {
        //   text: `${item?.shipmentNo || ""}`,
        //   fontSize: 9,
        // },
        {
          text: `${convertTotalAmount(item?.totalAmount, 2) || ""}`,
          fontSize: 9,
        },
        // {
        //   text: `${convertTotalAmount(Number(calculationDueBill(item))) || ""}`,
        //   fontSize: 9,
        // },
        {
          text: `${
            item?.credit ? convertTotalAmount(Number(item?.credit || 0)) : ""
          }`,
          fontSize: 9,
        },
        {
          text: `${
            item?.discount
              ? convertTotalAmount(Number(item?.discount || 0))
              : ""
          }`,
          fontSize: 9,
        },
        {
          text: `${
            item?.balance ? convertTotalAmount(Number(item?.balance || 0)) : ""
          }`,
          fontSize: 9,
        },
      ];
    });

    renderData = [...newData];
  }

  let docDefinition = {
    info: {
      title: `CUSTOMER LIST- ${formartDate(new Date())}`,
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
            text: `CUSTOMER LIST`,
          },
          {
            alignment: "right",
            text: `${formartDate(new Date())}`,
          },
        ],
      },
      HeaderOfPDF(),
      {
        style: "section",
        margin: [0, 0, 0, 0],
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: [{ text: `${"SHIPMENT DUE LIST"}\n`, fontSize: 20 }],
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
          widths: ["8%", "24%", "17%", "17%", "17%", "17%"],
          body: [
            [
              {
                text: "SL",
                style: "tableHeader",
              },
              {
                text: "NAME",
                style: "tableHeader",
              },
              // {
              //   text: "SHIP NO",
              //   style: "tableHeader",
              // },
              {
                text: "DEBIT",
                style: "tableHeader",
              },
              {
                text: "CREDIT",
                style: "tableHeader",
              },
              {
                text: "DISCOUNT",
                style: "tableHeader",
              },
              {
                text: "BALANCE",
                style: "tableHeader",
              },
            ],
            //   ...foremanDataDetails,
            ...renderData,
            [
              { text: "TOTAL", style: "tableFooter" },
              // { text: "", style: "tableFooter" },
              { text: "", style: "tableFooter" },
              {
                text: `${convertTotalAmount(
                  sumBy(data, (val) => Number(val?.totalAmount || 0))
                )}`,
                style: "tableFooter",
              },
              {
                text: `${convertTotalAmount(
                  sumBy(data, (val) => Number(val?.credit || 0))
                )}`,
                style: "tableFooter",
              },
              {
                text: `${convertTotalAmount(
                  sumBy(data, (val) => Number(val?.discount || 0))
                )}`,
                style: "tableFooter",
              },
              {
                text: `${convertTotalAmount(
                  sumBy(data, (val) => Number(val?.balance || 0))
                )}`,
                style: "tableFooter",
              },
            ],
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
    // background: function (currentPage, pageSize) {
    //   return [
    //     {
    //       image: parcelLogo,
    //       width: 350,
    //       // height: 100,
    //       absolutePosition: {
    //         x: (pageSize.width - 350) / 2,
    //         y: (pageSize.height - 300) / 2,
    //       },
    //       opacity: 0.08,
    //     },
    //   ];
    // },
    pageSize: "A4",

    defaultStyle: {
      border: [true, true, true, true], // Specify the border for all sides
      columnGap: 15,
    },
    layout: {
      defaultBorder: true, // Apply the default border to all content elements
    },
    styles: {
      headerStrip: stylesVals.tableFooter,
      summartTable: stylesVals.summartTable,
      tableHeader: stylesVals.tableHeader,
      tableFooter: stylesVals.tableFooter,
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
