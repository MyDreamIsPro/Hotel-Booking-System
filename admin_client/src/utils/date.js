const convertDate = (number) => (number < 10 ? "0" + number : number);

export const formatDate = (date, symbol = "-") => {
  const d = new Date(date);
  return (
    convertDate(d.getDate()) +
    symbol +
    convertDate(d.getMonth() + 1) +
    symbol +
    d.getFullYear()
  );
};

export const formatDateWithHour = (date, symbol = "/") => {
  const d = new Date(date);
  return (
    convertDate(d.getHours()) +
    ":" +
    convertDate(d.getMinutes()) +
    ":" +
    convertDate(d.getSeconds()) +
    " " +
    convertDate(d.getDate()) +
    symbol +
    convertDate(d.getMonth() + 1) +
    symbol +
    d.getFullYear()
  );
};

export const convertChatMessageTime = (date) => {
  const d = new Date(date);
  return convertDate(d.getHours()) + ":" + convertDate(d.getMinutes());
};

export const convertContactTime = (data) => {
  const input = new Date(data);
  const now = new Date();
  if (
    input.getFullYear() === now.getFullYear() &&
    input.getMonth() === now.getMonth() &&
    input.getDate() === now.getDate()
  ) {
    return (
      convertDate(input.getHours()) + ":" + convertDate(input.getMinutes())
    );
  }
  return (
    convertDate(input.getDate()) +
    "/" +
    convertDate(input.getMonth() + 1) +
    "/" +
    input.getFullYear()
  );
};
