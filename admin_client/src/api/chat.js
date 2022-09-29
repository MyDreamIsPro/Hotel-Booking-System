import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//MESSAGES
export const getListMessage = (group_id) => API.get(`/chat/${group_id}`);
export const searchUserForChat = (data) => API.post("/chat/user/search", data);
export const searchChatGroup = (partner_id) =>
  API.get(`/chat/search/${partner_id}`);
export const createGroupChat = (data) => API.post("/chat/group/new", data);
