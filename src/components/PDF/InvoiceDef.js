import { sumBy } from "lodash";
import { contact27, paidLogo, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
import HeaderOfPDF from "./InvoiceHeader";
import headerBanner from "./InvoiceBanner";
import invoiceCustomerInfo from "./InvoiceCustomerInfo";
import InvoiceFooterAuthor from "./InvoiceFooterAuthor";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,

export const generatePDF = (info) => {
  let renderData = [];
  if (info?.data) {
    let newData = info?.data?.map((item, i) => {
      let totalAmount =
        Number(item?.kg || item?.qty || 0) * Number(item?.rate || 0);
      const isBrand = item?.goodsName?.match(/brand/i) ? true : false;
      return [
        {
          text: `${i + 1}`,
          fontSize: 9,
          // color: `${isBrand ? "red" : "black"}`
        },
        {
          text: `${item?.goodsName || item?.des || ""}`,
          fontSize: 9,
          alignment: "left",
          color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: `${item?.ctn || ""}`,
          fontSize: 9,
          // color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: `${
            item?.kg || item?.qty
              ? Number(item?.kg || item?.qty).toFixed(2)
              : ""
          }`,
          fontSize: 9,
          // color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: `${item?.rate || ""}`,
          fontSize: 9,
          // color: `${isBrand ? "red" : "black"}`,
        },
        {
          text: `${
            totalAmount
              ? convertBengaliToEnglishNumber(totalAmount.toLocaleString("bn"))
              : ""
          }`,
          fontSize: 9,
          alignment: "right",
          // color: `${isBrand ? "red" : "black"}`,
        },
      ];
    });

    for (let i = 0; i < 25 - info?.data.length; i++) {
      newData.push([
        { text: `${info?.data.length + i + 1}`, fontSize: 9 },
        "",
        "",
        "",
        "",
        { text: ``, fontSize: 9, alignment: "right" },
      ]);
    }
    renderData = [...newData];
  }

  const netTotalAmount = (data) => {
    return sumBy(data, (val) => Number(val?.totalAmount || 0));
  };

  const totalDueBill = () => {
    const value =
      Number(netTotalAmount(info?.data)) +
      Number(info?.due || 0) -
      Number(info?.paid || 0);
    return value;
  };

  const totalDueSection =
    Math.sign(totalDueBill()) === -1
      ? `CONGRATULATIONS! ADVANCE${convertTotalAmount(totalDueBill())} TAKA`
      : `TOTAL DUE BILL- ${convertTotalAmount(totalDueBill())}`;

  let docDefinition = {
    info: {
      title: `${info?.customerName}- ${info?.shipmentBy}- ${formartDate(
        new Date()
      )}`,
      author: "Parcel",
      subject: "Shipment Bill",
    },

    // watermark: {
    //   text: `${info?.watermark ? "PAID BILL" : ""}`,
    //   color: "red",
    //   opacity: 0.5,
    //   bold: true,
    //   italics: false,
    //   fontSize: 50,
    //   border: [true, true, true, true],
    // },

    content: [
      {
        style: ["headerStrip"],
        margin: [0, 0, 0, 4],
        columns: [
          {
            alignment: "left",
            text: `CUSTOMER INVOICE`,
          },
          {
            alignment: "right",
            text: `${formartDate(new Date())}`,
          },
        ],
      },
      HeaderOfPDF(),
      headerBanner(),
      // {
      //   margin: [0, 0, 0, 0],
      //   table: {
      //     widths: ["*"],
      //     body: [
      //       [
      //         {
      //           border: [true, true, true, false],
      //           columns: [
      //             {
      //               alignment: "left",
      //               width: 60,
      //               image: parcelLogo,
      //             },
      //             {
      //               alignment: "left",
      //               text: [
      //                 "P",
      //                 { text: "arce", color: "red" },
      //                 "l ",
      //                 "Trade International",
      //               ],
      //               fontSize: 30,
      //               bold: true,
      //               margin: [0, 10, 0, 0],
      //             },
      //             {
      //               alignment: "right",
      //               width: 60,
      //               image: contact27,
      //             },
      //           ],
      //         },
      //       ],
      //     ],
      //   },
      //   layout: {
      //     defaultBorder: false,
      //   },
      // },
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

      // {
      //   style: "section",
      //   margin: [0, 5, 0, 0],
      //   table: {
      //     widths: ["*"],
      //     body: [
      //       [
      //         {
      //           text: [{ text: "SHIPMENT BILL\n", fontSize: 15 }],
      //           fillColor: "#1586D5",
      //           color: "#FFFFFF",
      //           alignment: "center",
      //           bold: true,
      //         },
      //       ],
      //     ],
      //   },
      //   layout: "noBorders",
      // },
      invoiceCustomerInfo(info),

      {
        style: "summartTable",
        table: {
          // headerRows: 1,
          // dontBreakRows: true,
          // keepWithHeaderRows: 1,
          widths: ["8%", "40%", "11%", "11%", "11%", "*"],
          body: [
            [
              {
                text: "SL",
                style: "tableHeader",
              },
              {
                text: "GOODS NAME",
                style: "tableHeader",
              },
              {
                text: "CTN NO.",
                style: "tableHeader",
              },
              {
                text: "KG",
                style: "tableHeader",
              },
              {
                text: "RATE",
                style: "tableHeader",
              },
              {
                text: "AMOUNT",
                style: "tableHeader",
              },
            ],
            //   ...foremanDataDetails,
            ...renderData,
            [
              { text: "TOTAL", style: "tableFooter" },
              { text: "", style: "tableFooter" },
              {
                text: `${
                  info?.data?.filter((item) => item?.ctn?.length > 0).length
                }`,
                style: "tableFooter",
              },
              {
                text: `${Number(
                  sumBy(info?.data, (val) => Number(val?.kg || 0))
                ).toFixed(2)}`,
                style: "tableFooter",
              },
              { text: "", style: "tableFooter" },
              {
                text: `${convertTotalAmount(netTotalAmount(info?.data))}`,
                style: "tableFooter",
                alignment: "right",
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
        unbreakable: true,
        stack: [
          {
            table: {
              widths: ["71.6%", "14.2%", "14.2%"],
              body: [
                [
                  {
                    rowSpan: 3,
                    text: totalDueSection,
                    alignment: "left",
                    margin: [40, 10, 0, 0],
                    fontSize: 15,
                    bold: true,
                    color: Math.sign(totalDueBill()) === -1 ? "green" : "red",
                    border: [true, true, true, true],
                  },
                  {
                    text: "DUE",
                    fillColor: "#555555",
                    color: "#FFFFFF",
                    fontSize: 10,
                    border: [true, true, true, false],
                  },
                  {
                    text: `${convertTotalAmount(Number(info?.due || 0))}`,
                    alignment: "right",
                    fontSize: 10,
                    color: `${info?.due ? "red" : "black"}`,
                    border: [true, true, true, false],
                  },
                ],
                [
                  "",
                  {
                    text: "PAID",
                    fillColor: "#555555",
                    color: "#FFFFFF",
                    fontSize: 10,
                  },
                  {
                    text: `${convertTotalAmount(Number(info?.paid || 0))}`,
                    alignment: "right",
                    fontSize: 10,
                    color: `${info?.paid ? "green" : "black"}`,
                  },
                ],
                [
                  "",
                  {
                    text: info?.watermark ? "" : "TOTAL",
                    fillColor: "#555555",
                    color: "#FFFFFF",
                    fontSize: 10,
                  },
                  {
                    text: info?.watermark
                      ? ""
                      : `${convertTotalAmount(Math.abs(totalDueBill()))}`,
                    alignment: "right",
                    bold: true,
                    fontSize: 10,
                  },
                ],
              ],
            },
            // layout: "border",
          },
          {
            style: "summartTable",
            fontSize: 10,
            margin: [0, 5, 0, 0],
            table: {
              widths: ["18%", "82%"],
              body: [
                [
                  "TAKA IN WORDS:",

                  {
                    text: `${convertNumberToWords(
                      Math.sign(totalDueBill()) === -1
                        ? Math.abs(totalDueBill())
                        : totalDueBill()
                    )} TAKA ONLY.`,
                    alignment: "left",
                  },
                ],
              ],
            },
          },
          // {
          //   // margin: [0, 35, 0, 0],
          //   // border:[true, true, true, true],
          //   table: {
          //     widths: ["50%", "50%"],
          //     body: [
          //       [
          //         {
          //           text: "CUSTOMER SIGNATURE",
          //           alignment: "left",
          //           bold: true,
          //           // border: [true, true, true, false],
          //           // decoration: "overline",
          //           margin: [5, 40, 0, 0],
          //           border: [true, false, true, false],
          //         },
          //         {
          //           text: "AUTHORISE SIGNATURE",
          //           alignment: "right",
          //           bold: true,
          //           // decoration: "overline",
          //           // border: [true, true, true, false],
          //           margin: [0, 40, 10, -2],
          //           border: [false, false, true, false],
          //         },
          //       ],
          //     ],
          //   },
          // },
          InvoiceFooterAuthor(),
          // {
          //   // margin: [0, 5],
          //   table: {
          //     widths: ["50%", "50%"],
          //     body: [
          //       [
          //         {
          //           text: "https://facebook.com/parceltradeinternational",
          //           alignment: "left",
          //           link: "https://facebook.com/parceltradeinternational",
          //           bold: true,
          //           fontSize: 10,
          //         },
          //         {
          //           text: "YOUR GETWAY TO CHINA",
          //           bold: true,
          //           fontSize: 10,
          //           alignment: "right",
          //         },
          //       ],
          //     ],
          //   },
          // },
        ],
        border: [true, true, true, true],
      },
    ],

    background: function (currentPage, pageSize) {
      if (info.watermark) {
        return [
          {
            image: paidLogo,
            width: 250,
            // height: 100,
            absolutePosition: {
              x: (pageSize.width - 250) / 2,
              y: (pageSize.height - 250) / 2,
            },
            opacity: 0.3,
          },
        ];
      } else {
        return [
          {
            image: parcelLogo,
            width: 350,
            // height: 100,
            absolutePosition: {
              x: (pageSize.width - 350) / 2,
              y: (pageSize.height - 300) / 2,
            },
            opacity: 0.08,
          },
        ];
      }
    },
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
      nameStyle: stylesVals.nameStyle,
    },
  };

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
  // pdfDocGenerator.getBase64((data) => {
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = `data:application/pdf;base64,${data}`;
  //   downloadLink.download = "document.pdf";
  //   downloadLink.innerHTML = "Download PDF";
  //   downloadLink.click();
  // });
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

export const stylesVals = {
  headerStrip: {
    fontSize: 8,
  },
  summartTable: {
    // margin: [0, 10, 0, 0],
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
};

export const convertTotalAmount = (val) => {
  return convertBengaliToEnglishNumber(
    val.toLocaleString("bn", {
      minimumFractionDigits: 0,
    })
  );
};
