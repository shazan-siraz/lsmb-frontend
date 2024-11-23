const generateUniqueTxnId = () => {
  const prefix = "TXN"; // Fixed prefix
  const timestamp = Date.now().toString(36).toUpperCase(); // Base36 encoded timestamp
  const randomPart = generateRandomString(10); // Random alphanumeric string

  return `${prefix}-${timestamp}-${randomPart}`;
};

const generateRandomString = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

export default generateUniqueTxnId;
