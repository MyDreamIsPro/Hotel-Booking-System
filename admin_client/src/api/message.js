import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//MESSAGES
export const getGroupMessages = (group_id) =>
  API.get(`/message/list/${group_id}`);
