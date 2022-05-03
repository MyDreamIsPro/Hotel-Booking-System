export const formatNumber = (num) => {
  // var parts = num.toString().split(".");
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // return parts[0];
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
