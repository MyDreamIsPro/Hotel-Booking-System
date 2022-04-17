import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const changePassword = (data) =>
  API.post("/user/change-password", data, { withCredentials: true });
export const updateInfo = (data) =>
  API.post("/user/update", data, { withCredentials: true });
export const getInfo = () => API.get("/user", { withCredentials: true });
export const login = (user) => API.post("/user/login", user);
export const signup = (user) => API.post(`/user/signup`, user);
export const logout = () => API.post("/user/logout");
export const ping = (user) =>
  API.post("/user/ping", user, { withCredentials: true })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

export const upload = (data) =>
  API.post("/user/upload", data, { withCredentials: true });
