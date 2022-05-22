import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getAllAccount = () => API.get("/account/list");
export const banAccount = (id, account) =>
  API.put(`/account/ban/${id}`, account);
export const activeAccount = (id, account) =>
  API.put(`/account/active/${id}`, account);
