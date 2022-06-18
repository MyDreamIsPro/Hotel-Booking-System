import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

export const getAllHotelForForm = () => API.get("/hotel/form");
export const getAllHotel = () => API.get("/hotel/list");
export const createHotel = (hotel) => API.post("/hotel/new", hotel);
export const deleteHotel = (id) => API.delete(`/hotel/delete/${id}`);
export const updateHotel = (id, hotel) => API.put(`/hotel/update/${id}`, hotel);
