import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

export const getAllReview = () => API.get("/review/list");
export const ignoreReview = (id) => API.get(`/review/ignore/${id}`);
export const acceptReview = (id) => API.get(`/review/accept/${id}`);
export const resetReview = (id) => API.get(`/review/reset/${id}`);
