import axios from "axios";

export const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader?.readAsDataURL(file);
  });

export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }

  return Math.floor(seconds || 0) + " seconds";
}

export function getLastTenYears() {
  const currentYear = new Date().getFullYear(); // Get the current year
  let years = [];
  for (let i = currentYear - 9; i <= currentYear; i++) {
    // Loop from current year - 9 to current year
    years.push(i);
  }
  return years;
}

export function getPreviousMonths(selectedYear) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const result = [];

  for (let year = selectedYear; year <= currentYear; year++) {
    const endMonth = year === currentYear ? new Date().getMonth() : 11;

    for (let month = 0; month <= endMonth; month++) {
      if (selectedYear >= year) {
        result.push(months[month]);
      }
    }
  }

  return result;
}

export const onFileUpload = async (file) => {
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  await axios.post(`/api/upload`, {
    file,
  });

  // const uploadTask = storage.ref(`files/${file.name}`).put(file);
  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     // progress function ...
  //     const progress = Math.round(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );
  //     console.log("Upload is " + progress + "% done");
  //   },
  //   (error) => {
  //     // Error function ...
  //     console.log(error);
  //   },
  //   () => {
  //     // complete function ...
  //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //       console.log("File available at", downloadURL);
  //     });
  //   }
  // );
};

// export const extractDetails = (text) => {
//   // Regex pattern to find date and transaction number
//   // const dateRegex = /(\d{2}\/\d{2}\/\d{4})/; // Adjust based on date format
//   // const transactionRegex = /TRXN[:\s]?(\d+)/; // Adjust based on expected format
//   // Regex for Confirmation number (assuming it's numeric and follows "Confirmation-")
//   const transactionRegex = /Confirmation\s+(\d+)/;

//   // Regex for Transfer Date
//   const dateRegex =
//     /Transfer Date.*\n.*(\w{3}, \w{3} \d{2}, \d{4} \d{2}:\d{2}:\d{2})/;
//   const dateMatch = text.match(dateRegex);
//   const transactionMatch = text.match(transactionRegex);

//   return {
//     trxDate: dateMatch? new Date(dateMatch[1]) : null,
//     trxNumber: transactionMatch? parseInt(transactionMatch[1]) : null,
//   }
//   // let details = {
//   //   transactionID: null,
//   //   transactionDate: null,
//   //   amount: null,
//   // };

//   // for (const [key, regex] of Object.entries(regexPatterns)) {
//   //   const match = text.match(regex);
//   //   if (match && match.groups[key]) {
//   //     details[key] = match.groups[key].trim();
//   //   }
//   // }
  
//   // return details;
// };

// const regexPatterns = {
//   trxNumber: new RegExp(
//     [
//       "Transaction ID",
//       "Transaction ID/Ref Number",
//       "Tr Id",
//       "TRXN NO",
//       "Reference Number",
//       "Reference ID",
//       "REF",
//       "Voucher Number",
//       "ট্রানজেকশন আইডি", // Bengali for Transaction ID
//     ].join("|") + "\\s*[:\\/]\\s*(?<transactionID>[\\d\\w]+)",
//     "i"
//   ),

//   trxDate: new RegExp(
//     [
//       "Transaction Date",
//       "Date",
//       "Date & Time",
//       "Transfer Date\\(DD/MM/YYYY\\)",
//       "সময়", // Bengali for Transaction Date
//     ].join("|") + "\\s*[:\\/]\\s*(?<transactionDate>[\\d\\w\\s/:,]+)",
//     "i"
//   ),

//   amount: new RegExp(
//     [
//       "Total Payment",
//       "Transfer Amount",
//       "Transaction Amount",
//       "Amount",
//       "Total Amount",
//       "DEPOSIT AMOUNT",
//       "Remittance Amount",
//       "Debit Amount",
//       "AMOUNT",
//       "Total",
//       "পরিমান", // Bengali for Amount
//       "সর্বমোট",
//       "৳",
//       "-৳",
//     ].join("|") + "\\s*[:\\/]\\s*[$]?\\s*(?<amount>[\\d,\\.]+)",
//     "i"
//   ),
// };


export const extractDetails = (text) => {
  
  const trxIdRegex = new RegExp(
    "(Transaction ID|Transaction ID/Ref Number|Tr Id|TRXN NO|Reference Number|Reference ID|REF|Voucher Number|ট্রানজেকশন আইডি)" +
      "\\s*[:\\/]?\\s*(?<trxNumber>[\\w\\d-]+)",
    "i"
  );
  
  const trxDateRegex = new RegExp(
    "(Transaction Date|Date|Date & Time|Transfer Date\\(DD/MM/YYYY\\)|সময়)" +
      "\\s*[:\\/]?\\s*(?<trxDate>.+)",
    "i"
  );
  
  const amountRegex = new RegExp(
    "(Total Payment|Transfer Amount|Transaction Amount|Amount|Total Amount|DEPOSIT AMOUNT|Debit Amount|AMOUNT|Total|পরিমান|সর্বমোট|৳|-৳)" +
      "\\s*[:\\/]?\\s*(BDT\\s*)?(?<amount>[\\d,\\.]+)",
    "i"
);
  const trxId = text.match(trxIdRegex);
  const trxDate = text.match(trxDateRegex);
  const amount = text.match(amountRegex);

  const result = {
    trxId: trxId ? trxId.groups.trxNumber : null,
    trxDate: trxDate ? trxDate.groups.trxDate : null,
    amount: amount ? amount.groups.amount : null,
  };

  return result;
};
