export const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
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