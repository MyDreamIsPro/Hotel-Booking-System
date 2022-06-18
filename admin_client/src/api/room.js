import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

//SERVICES
export const getAllRoom = () => API.get("/room/list");
export const createRoom = (room) => API.post("/room/new", room);
export const deleteRoom = (id) => API.delete(`/room/delete/${id}`);
export const updateRoom = (id, room) => API.put(`/room/update/${id}`, room);
