function generateDpsAccountNo() {
    const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0'); // 2-digit random number
    const timestampPart = Date.now().toString().slice(-4); // Last 4 digits of the timestamp
    return `DPS-${randomDigits}${timestampPart}`;
}

export default generateDpsAccountNo;
