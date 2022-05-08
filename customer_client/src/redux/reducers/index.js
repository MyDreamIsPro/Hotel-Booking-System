import { combineReducers } from "redux";
import user from "./user";
import hotelList from "./hotelList";
import room_type from "./room_type";
export default combineReducers({
  user,
  hotelList,
  room_type,
});
