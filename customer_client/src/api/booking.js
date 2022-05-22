import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const createBooking = (booking) => API.post("/booking/new", booking);
export const getAllBookingByUser = (userId) =>
  API.get(`/booking/list/${userId}`);
export const cancelBooking = (bookingId) =>
  API.get(`/booking/cancel/${bookingId}`);
