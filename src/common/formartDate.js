export const formartDate = (date = new Date()) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  const [month, day, year] = formattedDate.split(" ");
  const formattedString = `${day.replace(
    ",",
    ""
  )}-${month.toUpperCase()}-${year}`;
  return formattedString;
};
