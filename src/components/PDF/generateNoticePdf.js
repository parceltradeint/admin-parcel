import { sumBy } from "lodash";
import { contact27, parcelLogo, wechat, whatsApp } from "./image";
import { formartDate } from "@/common/formartDate";
// title: `${customerName}- ${type}- ${new Date().toLocaleString()}`,
import { cre } from "pdfmake";
import HeaderOfPDF from "./InvoiceHeader";
import { stylesVals } from "./InvoiceDef";
import InvoiceFooterAuthor from "./InvoiceFooterAuthor";
export const generateNoticePdf = (value) => {
  let docDefinition = {
    info: {
      title: `NOTICE BOARD- ${formartDate(new Date())}`,
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
            text: `NOTICE BOARD`,
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
                text: [{ text: `${"NOTICE BOARD"}\n`, fontSize: 20 }],
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
        style: "summartTable",
        table: {
          headerRows: 1,
          dontBreakRows: true,
          // keepWithHeaderRows: 1,
          widths: ["*"],
          heights: ["*"],
          body: [
            [
              {
                text: `${value}`,
                fontSize: 20
              },
            ],
          ],
        },
        layout: "border",
        margin: [0, 10, 0, 0]
      },
      InvoiceFooterAuthor(),
    ],
    background: function (currentPage, pageSize) {
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
