import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getUser = () => API.get("/user");
export const login = (user) => API.post("/user/login", user);
export const signup = (user) => API.post(`/user/signup`, user);
export const logout = () => API.post("/user/logout");
export const ping = (user) =>
  API.post("/user/ping", user, { withCredentials: true })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
