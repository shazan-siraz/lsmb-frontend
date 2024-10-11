const generateTransactionId = () => {
  const timestamp = Date.now().toString(36); // Base-36 timestamp
  const randomPart = Math.random().toString(36).substring(2, 12); // Random part with more length
  const uniqueId = `${timestamp}-${randomPart}`; // Combine timestamp and random part
  return `TXN-${uniqueId.toUpperCase()}`; // Transaction ID
};

export default generateTransactionId;
