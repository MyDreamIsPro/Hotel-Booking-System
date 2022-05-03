import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getAllHotel = () => API.get("/hotel");
export const createHotel = (hotel) => API.post("/hotel/new", hotel);
export const deleteHotel = (id) => API.delete(`/hotel/delete/${id}`);
export const updateHotel = (id, hotel) => API.put(`/hotel/update/${id}`, hotel);
