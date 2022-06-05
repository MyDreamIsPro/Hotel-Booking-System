import { STRING } from "../../constants";

export default (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_DISCOUNT:
      return action.payload;
    case STRING.CREATE_DISCOUNT:
      return [action.payload, ...state];
    case STRING.DELETE_DISCOUNT:
      return state.filter((discount) => discount._id !== action.payload);
    case STRING.UPDATE_DISCOUNT:
      return state.map((discount) =>
        discount._id !== action.payload._id ? discount : action.payload
      );
    default:
      return state;
  }
};
