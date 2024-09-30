export const timeFormat = (isoDate) => {
  // Convert the ISO date to a JavaScript Date object
  const date = new Date(isoDate);

  // Options to format the date
  const options = { day: "2-digit", month: "short", year: "numeric" };

  // Format the date to the desired format
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(",", "");

  return formattedDate; // Output: 10-Aug-2024
};
