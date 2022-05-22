const convertDate = (number) => (number < 10 ? "0" + number : number);

export const formatDateWithHour = (date) => {
  const d = new Date(date);
  return (
    convertDate(d.getDate()) +
    "/" +
    convertDate(d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " " +
    convertDate(d.getHours()) +
    ":" +
    convertDate(d.getMinutes())
  );
};
