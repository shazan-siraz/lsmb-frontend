const incrementLoanNumber = (loanId) => {
  if (loanId) {
    // স্ট্রিং-এর সংখ্যা অংশ আলাদা করা
    const parts = loanId.split("-");
    const prefix = parts[0]; // "LOAN"
    const number = parseInt(parts[1], 10); // "1002" -> 1002

    // সংখ্যা অংশ ইনক্রিমেন্ট করা
    const incrementedNumber = number + 1;

    // নতুন স্ট্রিং তৈরি করা
    const newLoanId = `${prefix}-${incrementedNumber
      .toString()
      .padStart(4, "0")}`;
    return newLoanId;
  }
};

export default incrementLoanNumber;
