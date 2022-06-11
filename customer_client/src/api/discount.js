import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const checkDiscount = (discount) =>
  API.post("/discount/check", discount);
export const getDiscountByUser = () => API.get("/discount/user");
