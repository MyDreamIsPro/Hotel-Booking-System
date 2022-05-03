import { combineReducers } from "redux";
import user from "./user";
import hotelList from "./hotelList";
export default combineReducers({
  user,
  hotelList,
});
