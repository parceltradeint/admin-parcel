/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
    "./src/**/*.js",
  ],
  darkMode: "class",
  theme: {
    inset: {
      0: 0,
      "1/2": "40%",
      "35p": "35%",
      "36p": "36%",
      "30p": "30%",
      "8p": "8%",
      "10p": "10%",
      "-10p": "-10%",
      "20p": "20%",
      "25p": "25%",
      "21-7p": "21.7%",
      "100p": "100%",
      10: "10px",
      5: "5px",
      8: "8px",
      12: "12px",
      14: "14px",
      15: "15px",
      20: "20px",
      "-3": "-3px",
      "0/1": "0.1px",
      "-10": "-10px",
      "-07": "-07px",
      "-12": "-12px",
      "-15": "-15px",
      "-20": "-20px",
      22: "22px",
      30: "30px",
      38: "38px",
      40: "40px",
      45: "45px",
      50: "50px",
      "-50": "-50px",
      "-110": "-110px",
      "-70": "-70px",
      "43p": "43.5%",
      55: "55px",
      60: "60px",
      64: "64px",
      65: "65px",
      77: "77px",
      70: "70px",
      94: "94px",
      100: "100px",
      105: "105px",
      140: "140px",
      150: "150px",
      110: "110px",
      120: "120px",
      125: "125px",
      127: "127px",
      160: "160px",
      170: "170px",
      181: "181px",
      190: "190px",
      220: "220px",
      350: "350px",
      400: "400px",
      600: "600px",
      "-100p": "-100%",
      "50p": "50%",
      "40p": "40%",
      "45p": "45%",
      "-50p": "-50%",
      "-25p": "-25%",
      "-20p": "-20px",
      "-18p": "-18px",
      auto: "auto",
      "19-7p": "19.7%",
      "18p": "18%",
    },
    extend: {
      colors: {
        primaryBg: "#3182ce",
        bannerBgColor: "#5e72e4",
        boxColor: "#f8f9fe",
        primaryText: "#1b1b32",
        errorColor: "#f5365c",
        detailsText: "#6c6d70",
        success: "#2dce89",
        eBlue: "#107FC3",
        warning: "#fec30f",
        bodyBg: "#B1FFA2",
        bodyFrom: "indigo-500",
        singleSelectBg: "rgb(229 231 235 / var(--tw-bg-opacity))",
        singleSelectedBg: "rgb(31 41 55 / var(--tw-bg-opacity))",
        singleSelectText: "rgb(17 24 39 / var(--tw-text-opacity))",
        singleSelectedText: "#FFFFFF",
        placeHolderColor: "#A0AEC0",
        sideBar: "#E6E6FA",
        sideBarMenuBg: "#152513",
        sideBarText: "#0E0E0E",
        sideBarHoverText: "#FFFFFF",
        sideBarHoverBg: "#2a4a2b",
        tableHeadBg: "#808080",
        headerBar: "#4169E1",
        colorDisabled: "#C8C8C8",
        activeStatus: "#31A24C",
        eSlateGray: "#687B86",
        textDimmed: "#929799",
        grayButtonBorder: "#CFCFCE",
        exploreSelectionBg: "#EDF2F7",
        circularTickColor: "#6EBE45",
        johnDeereBg: "#f1f1f1",
        johnDeereButtonBg: "#ffd526",
        johnDeereHelpText: "#83ac7c",
        textGrayDeep: "#82859F",
        eDeepGray: "#243841",
        errorRed: "#D6372D",
        eLightGray: "#DBD8D6",
        eTechBlue: "#8AABC3",
        eNavy: "#02428E",
        eYellow: "#E0B50F",
        eTeal: "#007E79",
        deepBlue: "#006EB8",
        lightBlue: "#DDF3FD",
        transparent: "transparent",
        black: "#000",
        textBlack: "#6B728F",
        white: "#fff",
        // red: '#e3342f',
        "red-lighter": "#f9acaa",
        offWhite: "#F5F5F5",
        bluedWhite: "#F2FAFE",
        grayButton: "#D5D3D8",
        grayedText: "#A6A6A7",
        grayDark: "#677c85",
        grayLight: "#f5f6fa",
        fieldNameColor: "#676E83",
        myFarmGrayBg: "#F6F6F6",
        windIcon: "#459DCA",
        thinBlack: "#2B2B2B",
        plant: "#AEC55C",
        soil: "#DCD394",
        pdfRed: "#E94848",
        yelloCircle: "#E0B50F",
        addNewFarm: "#EFF0F8",
        inputBorderColor: "#E2E8F0",
        grayHeader: "#fbfbfb",
        fieldFocusBg: "#F9F9F9",
        subMenuBg: "#f7fcff",
        generateIconColor: "#c4c4c4",
        trialBannerBg: "#bdbdbd",
        pdfButtonBorder: "#f6b6b6",
        horizonBg: "#edf2f7",
        tickGreen: "#1AB900",
        dodgerBlue: "#4EAAFF",
        skyBlue: "#68C7EA",
        cornFlowerBlue: "#6486FF",
        athensGray: "#F4F4F8",
        alabaster: "#F8F8F8",
        soapstone: "#FFFAF6",
        rangeSliderFrom: "rgba(104, 199, 234, 0.61)",
        rangeSliderVia: "rgba(78, 170, 255, 1)",
        rangeSliderTo: "rgba(60, 100, 177, 1)",
        jdFieldHover: "rgba(51, 51, 204, 0.1)",
        mineShaft: "rgba(42, 42, 42, 0.6)",
        dodgerBlueDark: "#405DFB",
        fileUploadButton: "#4A77D0",
        fileUploadText: "rgba(74, 119, 208, 0.5)",
        fileUploadBg: "#fafafa",
        fileModalBtnDisabled: "#95c3ed",
        tileProgressBarBG: "#D8DEE3",
        tileProgressBorder: "#CBCACF",
        tileBlocksBg: "#cbc9d0",
        tileDataBorder: "#1D1D1D",
        serviceTile: "#2A2A2A",
        serviceHead: "#646464",
        radioColor: "#909090",
        formLabel: "#666666",
        modalTitle: "#7D8195",
        pieSelectTitle: "#EFF0F8",
        tableRowText: "#A0A0A0",
      },
      fontFamily: {
        primaryFont: ["Itim", "cursive"],
        homeFont: [
          "Macan",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      padding: {
        "10p": "10%",
        "1/3": "0.4rem",
        "2/3": "0.3rem",
        "3/1": "0.3rem",
        "16p": "16%",
      },
      margin: {
        "10p": "10%",
        "20p": "20%",
        "30p": "30%",
        "40p": "40%",
        "50p": "50%",
        "55p": "55%",
        30: "7.5rem",
      },
      fontWeight: {
        300: "300",
      },
      lineHeight: {
        2: ".55rem",
        1: ".90rem",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        little: ".675rem",
        tiny: ".575rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      height: {
        "19px": "19px",
        "80p": "80%",
        "90p": "90%",
        "55p": "55%",
        "34p": "34%",
        15: "15px",
        29: "29px",
        "60px": "60px",
        400: "400px",
        500: "500px",
        600: "600px",
        "200px": "200px",
        250: "250px",
      },
      maxWidth: {
        "1/6": "15%",
        "1/4": "25%",
        "1/2": "50%",
        "1/3": "65%",
        "3/4": "75%",
        "8/10": "80%",
        "9/10": "90%",
      },
      maxHeight: {
        "1/4": "25%",
        "1/6": "35%",
        "1/5": "40%",
        "1/3": "45%",
        "1/2": "50%",
        "3/4": "75%",
        "3/5": "60%",
        "8/10": "80%",
        "9/10": "90%",
        500: "500px",
        250: "250px",
      },
      width: {
        "19px": "19px",
        "60px": "60px",
        400: "400px",
        340: "340px",
        120: "120px",
        "50p": "50%",
        "40p": "40%",
        "56p": "56%",
        "46p": "46.7%",
        "54p": "53.3%",
        "10p": "10%",
        "9p": "9%",
        "9.5r": "9.5rem",
        15: "15px",
        "22p": "22.7%",
        "20p": "20%",
        "21p": "21%",
        "23p": "23%",
        "70p": "70%",
        "65p": "65%",
        "79p": "79.8%",
        "76p": "76.8%",
        "30p": "29%",
        "80p": "80%",
        "85p": "85%",
        "89p": "89%",
        "87p": "87%",
        "90p": "90%",
        "92p": "92%",
        "98p": "95%",
        29: "29px",
        768: "768px",
      },
      minHeight: {
        10: "10px",
        48: "48px",
      },
      zIndex: {
        "-1": "-1",
      },
      animation: {
        ping: "ping 0.2s linear infinite",
      },
    },
  },
  plugins: [],
};
