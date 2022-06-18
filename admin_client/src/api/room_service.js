import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

//SERVICES
export const getAllRoomService = () => API.get("/room_service");
export const createRoomService = (roomService) =>
  API.post("/room_service/new", roomService);
export const deleteRoomService = (id) =>
  API.delete(`/room_service/delete/${id}`);
export const updateRoomService = (id, roomService) =>
  API.put(`/room_service/update/${id}`, roomService);
