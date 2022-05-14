import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getAvailableRoomType = (id, data) =>
  API.post(`/room_type/search/${id}`, data, { withCredentials: false });
