import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

//SERVICES
export const getAllRoomType = () => API.get("/room_type");
export const getRoomTypeByHotel = (id) => API.get(`/room_type/by_hotel/${id}`);
export const createRoomType = (roomType) =>
  API.post("/room_type/new", roomType);
export const deleteRoomType = (id) => API.delete(`/room_type/delete/${id}`);
export const updateRoomType = (id, roomType) =>
  API.put(`/room_type/update/${id}`, roomType);
