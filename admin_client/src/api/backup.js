import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getAllBackup = () => API.get("/backup");
export const createBackup = (backup) => API.post("/backup/new", backup);
export const updateBackup = (id, backup) =>
  API.post(`/backup/update/${id}`, backup);
export const restore = (id) => API.get(`/backup/restore/${id}`);
export const deleteBackup = (id) => API.get(`/backup/delete/${id}`);
