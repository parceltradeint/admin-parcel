import { parcelLogo, wechat } from "./image";

export default function HeaderOfPDF() {
  return {
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
                border: [true, true, true, true]
              },
              {
                alignment: "center",
                stack: [
                  {
                    text: [
                      "P",
                      { text: "arce", color: "red" },
                      "l ",
                      "Trade International",
                    ],
                    fontSize: 25,
                    bold: true,
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: "H-2553, Sayednagor, Vatara, Gulshan-2, Dhaka-1212.\n",
                    fontSize: 10,
                    border: [false, true, false, true],
                  },
                  {
                    text: "Cell: 01879314050, 01521584929; E-mail: parceltradeint@gmail.com\n",
                    fontSize: 10,
                    margin: [0, 5, 0, 0],
                  },
                ],
              },
              {
                alignment: "right",
                width: 60,
                image: wechat,
              },
            ],
          },
        ],
      ],
    },
    layout: {
      defaultBorder: false,
    },
  };
}