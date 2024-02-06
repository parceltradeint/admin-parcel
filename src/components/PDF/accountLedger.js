import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,
import { cre } from "pdfmake";
import HeaderOfPDF from "./InvoiceHeader";
import { convertTotalAmount, stylesVals } from "./InvoiceDef";
export const generateLedgerPDF = (info) => {
  let renderData = [];
  if (info?.data) {
    let newData = info?.data.map((item, i) => {
      return [
        {
          text: `${item.deliveryDate}`,
          fontSize: 9,
          // color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: `SHIPMENT NO. ${item?.shipmentNo}`,
          fontSize: 9,
          alignment: "left",
        },
        {
          text: `${convertTotalAmount(Number(item?.totalAmount || ""))}`,
          fontSize: 9,
          alignment: "center",
        },
        {
          text: `${convertTotalAmount(Number(item?.credit || ""))}`,
          fontSize: 9,
          alignment: "center",
        },
        {
          text: `${convertTotalAmount(Number(item?.balance))}`,
          fontSize: 9,
        },
      ];
    });

    renderData = [...newData];
  }

  let docDefinition = {
    info: {
      title: `${info?.customerName}- ${formartDate(new Date())}`,
      author: "Parcel",
      subject: "CUSTOMER LEDGER BILLS",
    },
    content: [
      {
        style: ["headerStrip"],
        margin: [0, 0, 0, 4],
        columns: [
          {
            alignment: "left",
            text: `CUSTOMER LEDGER BILLS`,
          },
          {
            alignment: "right",
            text: `${formartDate(new Date())}`,
          },
        ],
      },
      HeaderOfPDF(),
      {
        table: {
          widths: ["*"],
          margin: [0, 0, 0, 10],
          body: [
            [
              {
                stack: [
                  {
                    text: "ACCOUNT LEDGER\n",
                    fontSize: 20,
                    bold: true,
                    border: [false, true, false, true],
                  },
                  {
                    text: `FROM: ${info.shipmentNo}\n`,
                    fontSize: 15,
                    margin: [0, 5, 0, 0],
                  },
                  {
                    text: `ACCOUNT NAME: (${info?.customerId}) ${info?.customerName}\n`,
                    fontSize: 15,
                    margin: [0, 5, 0, 0],
                  },
                ],
                // fillColor: "#555555",
                // color: "#FFFFFF",
                bold: true,
                alignment: "center",
                margin: [0, 10, 0, 0],
              },
            ],
          ],
        },
        layout: "borders",
      },

      {
        style: "summartTable",
        table: {
          headerRows: 1,
          dontBreakRows: true,
          // keepWithHeaderRows: 1,
          widths: ["16%", "30%", "18%", "18%", "18%"],
          body: [
            [
              {
                text: "DATE",
                style: "tableHeader",
              },
              {
                text: "DESCREIPTIONS",
                style: "tableHeader",
              },
              {
                text: "DEBIT",
                style: "tableHeader",
              },
              {
                text: "CREDIT",
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
              { text: "", style: "tableFooter" },
              {
                text: `${convertTotalAmount(
                  sumBy(info?.data, (val) => Number(val?.totalAmount || 0))
                )}`,
                style: "tableFooter",
              },
              {
                text: `${convertTotalAmount(
                  sumBy(info?.data, (val) => Number(val?.credit || 0))
                )}`,
                style: "tableFooter",
              },
              {
                text: `${convertTotalAmount(
                  sumBy(info?.data, (val) => Number(val?.balance || 0))
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
      headerStrip: stylesVals.headerStrip,
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
