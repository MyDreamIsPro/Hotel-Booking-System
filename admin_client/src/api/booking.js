import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getAllBooking = () => API.get("/booking/admin/list");
export const checkInBooking = (id) => API.get(`/booking/check-in/${id}`);
export const checkOutBooking = (id) => API.get(`/booking/check-out/${id}`);
export const cancelBooking = (id) => API.get(`/booking/admin/cancel/${id}`);
