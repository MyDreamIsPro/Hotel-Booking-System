import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getAllEventByUser = () => API.get("/event");
export const createEvent = (event) => API.post("/event/new", event);
export const updateEvent = (id, event) => API.put(`/event/update/${id}`, event);
export const deleteEvent = (id) => API.delete(`/event/delete/${id}`);
