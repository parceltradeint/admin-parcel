import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,
import { cre } from "pdfmake";
import HeaderOfPDF from "./InvoiceHeader";
import { convertTotalAmount, stylesVals } from "./InvoiceDef";
export const generateCreditVoucher = (info) => {
  //   let docDefinition = {
  //     info: {
  //       title: `${info?.customerName}- ${formartDate(new Date())}`,
  //       author: "Parcel",
  //       subject: "CUSTOMER LEDGER BILL",
  //     },
  //     content: [
  //       {
  //         style: ["headerStrip"],
  //         margin: [0, 0, 0, 4],
  //         columns: [
  //           {
  //             alignment: "left",
  //             text: `Credit Voucher`,
  //           },
  //           {
  //             alignment: "right",
  //             text: `${formartDate(new Date())}`,
  //           },
  //         ],
  //       },
  //       HeaderOfPDF(),
  //       {
  //         table: {
  //           widths: ["*"],
  //           body: [
  //             [
  //               {
  //                 stack: [
  //                   {
  //                     text: "Credit Voucher\n",
  //                     fontSize: 20,
  //                     bold: true,
  //                     border: [false, true, false, true],
  //                   },
  //                     {
  //                       text: `FROM: \n`,
  //                       fontSize: 15,
  //                       margin: [0, 5, 0, 0],
  //                     },
  //                     {
  //                       text: `ACCOUNT NAME: \n`,
  //                       fontSize: 15,
  //                       margin: [0, 5, 0, 0],
  //                     },
  //                 ],
  //                 // fillColor: "#555555",
  //                 // color: "#FFFFFF",
  //                 bold: true,
  //                 alignment: "center",
  //                 margin: [0],
  //               },
  //             ],
  //           ],
  //         },
  //         layout: "borders",
  //       },
  //       //   {
  //       //     // Header containing the title and additional details
  //       //     columns: [
  //       //       {
  //       //         width: "*",
  //       //         text: [
  //       //           {
  //       //             text: "Parcel #Trade International\n",
  //       //             bold: true,
  //       //             fontSize: 14,
  //       //           },
  //       //           { text: "Add: Gmail:\n", fontSize: 10 },
  //       //           { text: "Mob:", fontSize: 10 },
  //       //         ],
  //       //       },
  //       //       {
  //       //         width: "auto",
  //       //         text: "CREDIT VOUCHER",
  //       //         style: "header",
  //       //       },
  //       //     ],
  //       //   },
  //     //   {
  //     //     // Space between sections
  //     //     text: "\n\n",
  //     //   },
  //     //   {
  //     //     // Main body of the voucher
  //     //     columns: [
  //     //       {
  //     //         // Column for From, Method, Amount
  //     //         width: "*",
  //     //         style: "body",
  //     //         text: [
  //     //           { text: "From:\n", bold: true },
  //     //           { text: "Method:\n", bold: true },
  //     //           { text: "Amount:\n", bold: true },
  //     //         ],
  //     //       },
  //     //       {
  //     //         // Column for values
  //     //         width: "auto",
  //     //         style: "bodyValues",
  //     //         text: [
  //     //           { text: "Received By:\n" },
  //     //           { text: "Date & Time:\n" },
  //     //           { text: "TRX ID:\n" },
  //     //         ],
  //     //       },
  //     //     ],
  //     //   },
  //       {
  //         // Footer notes and signatures
  //         text: [
  //           "This receipt has been generated electronically\n\n",
  //           {
  //             text: "Recipient's Signature: ",
  //             italics: true,
  //             decoration: "underline",
  //           },
  //           { text: "      " }, // Space for signature
  //           {
  //             text: "Account's Signature: ",
  //             italics: true,
  //             decoration: "underline",
  //           },
  //         ],
  //         style: "footer",
  //       },
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 16,
  //         bold: true,
  //         margin: [0, 20, 0, 10], // top, right, bottom, left
  //         alignment: "right",
  //       },
  //       body: {
  //         bold: false,
  //         fontSize: 12,
  //         margin: [0, 0, 10, 0],
  //       },
  //       bodyValues: {
  //         margin: [0, 0, 0, 0],
  //         alignment: "right",
  //       },
  //       footer: {
  //         fontSize: 10,
  //         italics: true,
  //         margin: [0, 20, 0, 0],
  //       },
  //     },
  //     // background: function (currentPage, pageSize) {
  //     //   return [
  //     //     {
  //     //       image: parcelLogo,
  //     //       width: 350,
  //     //       // height: 100,
  //     //       absolutePosition: {
  //     //         x: (pageSize.width - 350) / 2,
  //     //         y: (pageSize.height - 300) / 2,
  //     //       },
  //     //       opacity: 0.08,
  //     //     },
  //     //   ];
  //     // },
  //     pageSize: "A4",

  //     defaultStyle: {
  //       border: [true, true, true, true], // Specify the border for all sides
  //       columnGap: 15,
  //     },
  //     layout: {
  //       defaultBorder: true, // Apply the default border to all content elements
  //     },
  //     styles: {
  //       headerStrip: stylesVals.headerStrip,
  //       summartTable: stylesVals.summartTable,
  //       tableHeader: stylesVals.tableHeader,
  //       tableFooter: stylesVals.tableFooter,
  //       nameStyle: {
  //         color: "red",
  //       },
  //     },
  //   };
  // const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  let docDefinition = {
    info: {
      title: `${info?.receivedBy}- ${formartDate(new Date())}`,
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
            text: `Credit Voucher`,
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
                    text: "Credit Voucher\n",
                    fontSize: 20,
                    bold: true,
                    border: [false, true, false, true],
                    decoration: "underline",
                  },
                  {
                    table: {
                      widths: ["*", "*"],
                      body: [
                        [
                          {
                            text: `From: ${info?.from}`,
                            bold: true,
                            alignment: "left",
                          },
                          {
                            text: `Received By: ${info?.receivedBy}`,
                            alignment: "right",
                          },
                        ],
                        [
                          {
                            text: `Method: ${info?.method}`,
                            bold: true,
                            alignment: "left",
                          },
                          {
                            text: `Date: ${info?.dateTime}`,
                            alignment: "right",
                          },
                        ],
                        [
                          {
                            text: `Amount: ${info?.amount}`,
                            bold: true,
                            alignment: "left",
                          },
                          {
                            text: `TRX ID: ${info?.trxId}`,
                            alignment: "right",
                          },
                        ],
                      ],
                    },
                    layout: "lightHorizontalLines",
                    margin: [0, 10, 0, 0],
                  },
                  // {
                  //   columns: [
                  //     {
                  //       // Column for From, Method, Amount
                  //       alignment: "left",
                  //       width: "*",
                  //       style: "body",
                  //       fontSize: 10,
                  //       border: [false, true, false, true],
                  //       text: [
                  //         { text: `From: ${info?.from}\n`, bold: true },
                  //         { text: `Method: ${info?.method}\n`, bold: true },
                  //         { text: `Amount: ${info?.amount}\n`, bold: true },
                  //       ],
                  //     },
                  //     {
                  //       // Column for values
                  //       alignment: "right",
                  //       width: "auto",
                  //       style: "bodyValues",

                  //       fontSize: 10,
                  //       text: [
                  //         { text: `Received By: ${info?.receivedBy}\n` },
                  //         { text: `Date: ${info?.dateTime}\n` },
                  //         { text: `TRX ID: ${info?.trxId}\n` },
                  //       ],
                  //     },
                  //   ],
                  // },
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
        width: "*",
        alignment: "center",
        text: ["This receipt has been generated electronically.\n\n"],
        margin: [0, 20, 0, 0],
      },
      {
        columns: [
          {
            alignment: "left",
            text: "Recipient's Signature: ",
            italics: true,
            decoration: "underline",
            margin: [0, 20, 0, 0],
          },
          { text: "      " }, // Space for signature
          {
            alignment: "right",
            text: "Account's Signature: ",
            italics: true,
            decoration: "underline",
            margin: [0, 20, 0, 0],
          },
        ],
        // width: "*",
        // text: [
        //   "This receipt has been generated electronically\n\n",
        //   {
        //     alignment: "left",
        //     text: "Recipient's Signature: ",
        //     italics: true,
        //     decoration: "underline",
        //   },
        //   { text: "      " }, // Space for signature
        //   {
        //     alignment: "right",
        //     text: "Account's Signature: ",
        //     italics: true,
        //     decoration: "underline",
        //   },
        // ],
        style: "footer",
      },

      //   {
      //     text: [
      //       {
      //         text: dueOrAdvance
      //           ? [
      //               {
      //                 text:
      //                   Math.sign(dueOrAdvance) === -1
      //                     ? `CONGRATULATIONS! ADVANCE: ${convertTotalAmount(
      //                         Math.abs(dueOrAdvance)
      //                       )} TAKA`
      //                     : `TOTAL DUE- ${convertTotalAmount(dueOrAdvance)} TAKA`,
      //                 color: Math.sign(dueOrAdvance) === -1 ? "green" : "red",
      //               },
      //             ]
      //           : "",
      //       },
      //     ],
      //     alignment: "right",
      //     fontSize: 20,
      //     margin: [0, 20, 0, 0],
      //     bold: true,
      //   },
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
  var win = window.open("", "_blank");
  pdfMake.createPdf(docDefinition).open(
    {
      filename: "Credit Voucher.pdf",
      options: {
        windowTitle: "My Document",
      },
    },
    win
  );
};
