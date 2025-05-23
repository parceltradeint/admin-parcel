import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,
import { cre } from "pdfmake";
import HeaderOfPDF from "./InvoiceHeader";
import { convertTotalAmount, stylesVals } from "./InvoiceDef";
export const generateCreditVoucher = (info) => {
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
                    columns: [
                      {
                        // Column for From, Method, Amount
                        alignment: "left",
                        width: "*",
                        style: "body",
                        fontSize: 10,
                        border: [false, true, false, true],
                        text: [
                          { text: `From: ${info?.from}\n`, bold: true },
                          { text: `Method: ${info?.method}\n`, bold: true },
                          { text: `Amount: ${info?.amount}\n`, bold: true },
                        ],
                      },
                      {
                        // Column for values
                        alignment: "right",
                        width: "auto",
                        style: "bodyValues",

                        fontSize: 10,
                        text: [
                          { text: `Received By: ${info?.receivedBy}\n` },
                          { text: `Date: ${info?.dateTime}\n` },
                          { text: `TRX ID: ${info?.trxId}\n` },
                        ],
                      },
                    ],
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
