export const isoDateToTime = (isoDate) => {
  const date = new Date(isoDate); // Convert ISO string to Date object
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format
  });
};
