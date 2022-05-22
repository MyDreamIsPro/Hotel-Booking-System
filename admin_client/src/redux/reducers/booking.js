import { STRING } from "../../constants";

export default (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_BOOKING:
      return action.payload;
    case STRING.CREATE_BOOKING:
      return [action.payload, ...state];
    case STRING.DELETE_BOOKING:
      return state.filter((booking) => booking._id !== action.payload);
    case STRING.CHECK_IN_BOOKING ||
      STRING.CHECK_OUT_BOOKING ||
      STRING.CANCEL_BOOKING:
      return state.map((booking) =>
        booking._id !== action.payload._id ? booking : action.payload
      );
    default:
      return state;
  }
};
