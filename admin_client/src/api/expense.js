import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

export const getAllExpense = () => API.get("/expense/list");
export const createExpense = (expense) => API.post("/expense/new", expense);
export const deleteExpense = (id) => API.delete(`/expense/delete/${id}`);
export const updateExpense = (id, expense) =>
  API.put(`/expense/update/${id}`, expense);
