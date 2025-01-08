const getOneMonthAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1); // ১ মাস আগের তারিখ
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // মাসটি ১ থেকে ১২ এর মধ্যে হবে
  const day = String(date.getDate()).padStart(2, "0"); // দিনটি ২ ডিজিটের হতে হবে

  return `${year}-${month}-${day}`; // 'YYYY-MM-DD' ফরম্যাটে
};

export default getOneMonthAgo;
