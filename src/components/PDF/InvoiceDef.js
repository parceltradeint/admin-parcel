import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,

export const generatePDF = (info) => {
  let renderData = [];
  if (info?.data) {
    let newData = info?.data?.map((item, i) => {
      console.log("item", item);
      let totalAmount = Number(item?.kg || item?.qty || 0) * Number(item?.rate || 0);
      return [
        { text: `${i + 1}`, fontSize: 12 },
        { text: `${item?.goodsName || item?.des}`, fontSize: 12, alignment: "left" },
        { text: `${item?.ctn || ""}`, fontSize: 12 },
        { text: `${Number(item?.kg || item?.qty).toFixed(2)}`, fontSize: 12 },
        { text: `${item?.rate}`, fontSize: 12 },
        {
          text: `${convertBengaliToEnglishNumber(
            totalAmount.toLocaleString("bn")
          )}`,
          fontSize: 12,
          alignment: "right",
        },
      ];
    });

    for (let i = 0; i < 13 - info?.data.length; i++) {
      newData.push([
        { text: `${info?.data.length + i + 1}`, fontSize: 12 },
        "",
        "",
        "",
        "",
        { text: ``, fontSize: 12, alignment: "right" },
      ]);
    }
    renderData = [...newData];
  }

  const netTotalAmount = (data) => {
    return sumBy(data, (val) => Number(val?.totalAmount || 0));
  };
  // const netTotalAmount = (data) => {
  //   return convertBengaliToEnglishNumber(
  //     sumBy(data, (val) => Number(val?.totalAmount || 0)).toLocaleString("bn", {
  //       minimumFractionDigits: 2,
  //     })
  //   );
  // };
  const convertTotalAmount = (val) => {
    return convertBengaliToEnglishNumber(
      val.toLocaleString("bn", {
        minimumFractionDigits: 0,
      })
    );
  };

  let docDefinition = {
    info: {
      title: `${info?.customerName}- ${info?.shipmentBy}- ${formartDate(
        new Date()
      )}`,
      author: "Parcel",
      subject: "Shipment Bill",
    },
    content: [
      {
        style: ["headerStrip"],
        margin: [0, 0, 0, 4],
        columns: [
          {
            alignment: "left",
            text: `Customer Invoice`,
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
                border: [true, true, true, false],
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
      {
        table: {
          widths: ["13%", "73%", "14%"],
          body: [
            [
              {
                stack: [
                  {
                    image: wechat,
                    width: 50,
                    margin: [10, 0, 0, 0],
                  },
                  {
                    text: "WeChat",
                    color: "#333",
                    alignment: "center",
                    fontSize: 9,
                    margin: [4, 4, 0, 0],
                  },
                ],
              },
              {
                stack: [
                  {
                    text: "H-2553, Sayednagor, Vatara, Gulshan-2, Dhaka-1212.\n",
                    fontSize: 15,
                    border: [false, true, false, true],
                  },
                  {
                    text: "Cell: 01879314050, 01521584929\n",
                    fontSize: 15,
                    margin: [0, 5, 0, 0],
                  },
                ],
                fillColor: "#555555",
                color: "#FFFFFF",
                bold: true,
                alignment: "center",
                margin: [0, 10, 0, 0],
              },

              {
                stack: [
                  {
                    image: whatsApp,
                    width: 53,
                    margin: [10, 0, 0, 0],
                  },
                  {
                    text: "WhatsApp",
                    color: "#333",
                    alignment: "center",
                    fontSize: 9,
                    margin: [4, 0, 0, 0],
                  },
                ],
              },
            ],
          ],
        },
        layout: "borders",
      },
      {
        style: "section",
        margin: [0, 5, 0, 0],
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: [{ text: "SHIPMENT BILL\n", fontSize: 20 }],
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
              `${info?.customerName || ""}`,
              {
                text: "DATE",
                alignment: "left",
                fillColor: "#555555",
                color: "#FFFFFF",
                bold: true,
              },
              { text: `${formartDate(new Date())}`, alignment: "left"}
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
                text: `BY ${info?.shipmentBy}`,
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
              { text: `${info?.reporting}`, alignment: "left", border: [true, false, true, true]}
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
                text: "ADDRESS",
                alignment: "left",
                fillColor: "#555555",
                color: "#FFFFFF",
                bold: true,
                border: [true, false, false, true],
              },
              {
                text: `${info?.address || ""}`,
                border: [true, false, false, true],
              },
              {
                text: "SHIPMENT NO",
                alignment: "left",
                fillColor: "#555555",
                color: "#FFFFFF",
                bold: true,
                border: [true, false, false, true],
              },
              {
                text: `${info?.shipmentNo}`,
                alignment: "left",
                border: [true, false, true, true],
              },
            ],
          ],
        },
      },
      
      {
        fontSize: 11,
        margin: [0, 0, 0, 5],
        // border:[false, false, false, false],
        table: {
          widths: ["14.5%", "85.5%"],
          body: [
            [
              {
                text: "REMARKS",
                alignment: "left",
                fillColor: "#555555",
                color: "#FFFFFF",
                bold: true,
                border: [true, false, true, true],
                margin: [0, -2, 0, 0]
              },
              {
                text: `${info?.remarks}`,
                color: "red",
                bold: true,
                border: [false, false, true, true],
              },
            ],
          ],
        },
      },

      {
        style: "summartTable",
        table: {
          headerRows: 1,
          dontBreakRows: true,
          // keepWithHeaderRows: 1,
          widths: ["8%", "35%", "15%", "12%", "15%", "*"],
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
              { text: `${info?.data?.length}`, style: "tableFooter" },
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
        stack: [
          {
            table: {
              widths: ["71.6%", "14.2%", "14.2%"],
              body: [
                [
                  {
                    rowSpan: 3,
                    text: `TOTAL DUE BILL- ${convertTotalAmount(
                      Number(netTotalAmount(info?.data)) +
                        Number(info?.due || 0) -
                        Number(info?.paid || 0)
                    )}`,
                    alignment: "left",
                    margin: [40, 15, 0, 0],
                    fontSize: 20,
                    bold: true,
                    color: "red",
                    border: [true, false, false, true],
                  },
                  {
                    text: "DUE",
                    fillColor: "#555555",
                    color: "#FFFFFF",
                    fontSize: 13,
                    border: [true, false, false, false],
                  },
                  {
                    text: `${convertTotalAmount(Number(info?.due || 0))}`,
                    alignment: "right",
                    fontSize: 13,
                    border: [true, false, true, false],
                  },
                ],
                [
                  "",
                  {
                    text: "PAID",
                    fillColor: "#555555",
                    color: "#FFFFFF",
                    fontSize: 13,
                  },
                  {
                    text: `${convertTotalAmount(Number(info?.paid || 0))}`,
                    alignment: "right",
                    fontSize: 13,
                  },
                ],
                [
                  "",
                  {
                    text: "TOTAL",
                    fillColor: "#555555",
                    color: "#FFFFFF",
                    fontSize: 13,
                  },
                  {
                    text: `${convertTotalAmount(
                      Number(netTotalAmount(info?.data)) +
                        Number(info?.due || 0) -
                        Number(info?.paid || 0)
                    )}`,
                    alignment: "right",
                    bold: true,
                    fontSize: 13,
                  },
                ],
              ],
            },
            layout: "noBorder",
          },
          {
            style: "summartTable",
            fontSize: 11,
            margin: [0, 5, 0, 0],
            table: {
              widths: ["18%", "82%"],
              body: [
                [
                  "TAKA IN WORDS:",
                  {
                    text: `${convertNumberToWords(
                      Number(netTotalAmount(info?.data)) +
                        Number(info?.due || 0) -
                        Number(info?.paid || 0)
                    )} TAKA ONLY.`,
                    alignment: "left",
                  },
                ],
              ],
            },
          },
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
                    fontSize: 11,
                  },
                  {
                    text: "YOUR GETWAY TO CHINA",
                    bold: true,
                    fontSize: 11,
                    alignment: "right"
                  },
                ],
              ],
            },
          },
        ],
        // margin: [40, -150],
        border: [true, true, true, true],
      },
    ],

    // pageBreakBefore: (currentNode, followingNodes) => {
    //   // Check if currentNode._pdfmakeWrapper.node is defined
    //   if (currentNode._pdfmakeWrapper && currentNode._pdfmakeWrapper.node) {
    //     const footerHeight = 40; // Adjust this value based on your footer's height
    //     const contentHeight = currentNode._pdfmakeWrapper.node.clientHeight;
    //     const remainingPageSpace = currentNode._pdfmakeWrapper.page.maxY - contentHeight;

    //     return followingNodes.length === 0 && remainingPageSpace < footerHeight;
    //   }
    //   return false; // Return false if currentNode._pdfmakeWrapper.node is undefined
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
      headerStrip: {
        fontSize: 8,
      },
      summartTable: {
        // margin: [0, 10, 0, 0],
        fontSize: 10,
        alignment: "center",
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "#FFFFFF",
        fillColor: "#555555",
        alignment: "center",
      },
      tableFooter: {
        bold: true,
        fontSize: 12,
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
