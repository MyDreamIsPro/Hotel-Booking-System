import { STRING } from "../../constants";

export default (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_LOG:
      return action.payload;
    default:
      return state;
  }
};
