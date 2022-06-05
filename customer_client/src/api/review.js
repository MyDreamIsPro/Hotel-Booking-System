import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const createReview = (data) => API.post("/review/new", data);
export const getAllReviewByHotel = (id) => API.get(`/review/hotel/${id}`);
export const getAllReviewByPagination = (hotel, page) =>
  API.get(`/review/page/${hotel}&${page}`);
export const getAllReviewByUser = () => API.get("/review/user");
