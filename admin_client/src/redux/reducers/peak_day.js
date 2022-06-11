import { STRING } from "../../constants";

export default (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_PEAK_DAY:
      return action.payload;
    case STRING.CREATE_PEAK_DAY:
      return [action.payload, ...state];
    case STRING.DELETE_PEAK_DAY:
      return state.filter((peak_day) => peak_day._id !== action.payload);
    case STRING.UPDATE_PEAK_DAY:
      return state.map((peak_day) =>
        peak_day._id !== action.payload._id ? peak_day : action.payload
      );
    default:
      return state;
  }
};
