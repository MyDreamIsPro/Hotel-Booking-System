import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

//SERVICES
export const getAllDiscount = () => API.get("/discount");
export const createDiscount = (discount) => API.post("/discount/new", discount);
export const deleteDiscount = (id) => API.delete(`/discount/delete/${id}`);
export const updateDiscount = (id, discount) =>
  API.put(`/discount/update/${id}`, discount);
