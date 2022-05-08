import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getAvailableRoomType = (id) =>
  API.get(`/room_type/search/${id}`, { withCredentials: false });
