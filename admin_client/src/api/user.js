import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (user) => API.post("/admin/login", user);
export const signup = (user) => API.post(`/admin/signup`, user);
export const logout = () => API.post("/admin/logout");
export const checkAuth = () => API.get("/admin/auth");
