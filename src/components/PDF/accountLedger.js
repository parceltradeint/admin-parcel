import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,
import { cre } from "pdfmake";
import HeaderOfPDF from "./InvoiceHeader";
import { convertTotalAmount, stylesVals } from "./InvoiceDef";
export const generateLedgerPDF = (info) => {
  let renderData = [];
  let allData = [];

  if (info?.data) {
    const finalData = info?.data.flatMap((entry) => {
      const baseEntry = {
        shipmentNo: entry.shipmentNo || "",
        shipmentBy: entry.shipmentBy || "",
        date: entry.deliveryDate || "",
        totalAmount: entry.totalAmount || "",
        credit: "",
        balance: entry.balance || "",
        trasferredBy: "",
        trxDate: "",
        trxId: "",
      };

      const transactions = Array.isArray(entry.transactions)
        ? entry.transactions.map((trx) => ({
            shipmentNo: entry.shipmentNo || "",
            shipmentBy: entry.shipmentBy || "",
            date: trx.trxDate || "",
            totalAmount: "",
            credit: trx.credit || "",
            balance: entry.balance || "",
            trasferredBy: trx.trasferredBy || "",
            trxDate: trx.trxDate || "",
            trxId: trx.trxId || "",
          }))
        : [];

      return [baseEntry, ...transactions];
    });

    let runningBalance = 0;
    const calculatedArray = finalData.map((item) => {
      if (Number(item.credit)) {
        runningBalance -= Number(item.credit);
      } else {
        runningBalance += Number(item.totalAmount);
      }

      return {
        ...item,
        balance: runningBalance,
      };
    });
    let newData = calculatedArray?.map((item, i) => {
      return [
        {
          text: `${item.date}`,
          fontSize: 9,
          // color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: item?.trasferredBy
            ? `BILL RECEIVED BY ${item?.trasferredBy} FOR ${item?.shipmentBy} SHIPMENT NO. ${item?.shipmentNo}`
            : `${item?.shipmentBy} - SHIPMENT NO. ${item?.shipmentNo}`,
          fontSize: 9,
          alignment: "left",
        },
        {
          text: item?.totalAmount
            ? `${convertTotalAmount(Number(item?.totalAmount || ""))}`
            : "",
          fontSize: 9,
          alignment: "center",
        },
        {
          text: `${
            item?.credit ? convertTotalAmount(Number(item?.credit)) : ""
          }`,
          fontSize: 9,
          alignment: "center",
        },
        {
          text: `${convertTotalAmount(Number(item?.balance))}`,
          fontSize: 9,
        },
      ];
    });
    allData = [...calculatedArray];
    renderData = [...newData];
  }

  const dueOrAdvance =
    Number(sumBy(allData, (item) => Number(item.totalAmount || 0)).toFixed(2)) -
    sumBy(allData, (item) => Number(item.credit || 0)) -
    sumBy(info?.data, (item) => Number(item.discount || 0));

  let docDefinition = {
    info: {
      title: `${info?.customerName}- ${formartDate(new Date())}`,
      author: "Parcel",
      subject: "CUSTOMER LEDGER BILL",
    },
    content: [
      {
        style: ["headerStrip"],
        margin: [0, 0, 0, 4],
        columns: [
          {
            alignment: "left",
            text: `CUSTOMER LEDGER BILL`,
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
              { text: "", style: "tableFooter" },
              { text: "TOTAL", style: "tableFooter", alignment: "left" },

              {
                text: `${convertTotalAmount(
                  sumBy(allData, (val) => Number(val?.totalAmount || 0))
                )}`,
                style: "tableFooter",
              },
              {
                text: `${convertTotalAmount(
                  sumBy(allData, (val) => Number(val?.credit || 0)) || ""
                )}`,
                style: "tableFooter",
              },
              {
                text: `${convertTotalAmount(
                  sumBy(allData, (val) => Number(val?.totalAmount || 0)) -
                    sumBy(allData, (val) => Number(val?.credit || 0))
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

      {
        text: [
          {
            text: dueOrAdvance
              ? [
                  {
                    text:
                      Math.sign(dueOrAdvance) === -1
                        ? `CONGRATULATIONS! ADVANCE: ${convertTotalAmount(
                            Math.abs(dueOrAdvance)
                          )} TAKA`
                        : `TOTAL DUE- ${convertTotalAmount(dueOrAdvance)} TAKA`,
                    color: Math.sign(dueOrAdvance) === -1 ? "green" : "red",
                  },
                ]
              : "",
          },
        ],
        alignment: "right",
        fontSize: 20,
        margin: [0, 20, 0, 0],
        bold: true,
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
      filename: "Parcel trade int.pdf",
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
