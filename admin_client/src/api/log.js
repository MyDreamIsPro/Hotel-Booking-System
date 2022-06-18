import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

export const getAllLog = () => API.get("/log");
