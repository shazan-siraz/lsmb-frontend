const isToday = (createdAt) => {
  const createdDate = new Date(createdAt);
  const today = new Date();

  return (
    createdDate.getFullYear() === today.getFullYear() &&
    createdDate.getMonth() === today.getMonth() &&
    createdDate.getDate() === today.getDate()
  );
};

export default isToday;
