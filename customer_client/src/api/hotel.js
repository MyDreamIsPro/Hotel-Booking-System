import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getHotelByFilter = (data) =>
  API.post("/hotel/search", data, { withCredentials: false });

export const getHotelById = (id) => API.get(`/hotel/one/${id}`);
