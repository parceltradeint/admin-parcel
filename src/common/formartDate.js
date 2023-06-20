export const formartDate = (date) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  const [month, day, year] = formattedDate.split(" ");
  const formattedString = `${day.replace(",", "")}-${month}-${year}`;
  return formattedString;
};
