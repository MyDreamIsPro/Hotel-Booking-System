import { combineReducers } from "redux";
import user from "./user";
import hotel from "./hotel";
import room from "./room";
import room_type from "./room_type";
import room_service from "./room_service";

export default combineReducers({
  user,
  hotel,
  room,
  room_service,
  room_type,
});
