import { combineReducers } from "redux";
import user from "./user";
import hotel from "./hotel";
export default combineReducers({
  user,
  hotel,
});
