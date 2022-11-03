import { STRING } from "../../constants";

const event = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_EVENT:
      return action.payload;
    case STRING.CREATE_EVENT:
      return [action.payload, ...state];
    case STRING.DELETE_EVENT:
      return state.filter(
        (event) => event.extendedProps._id !== action.payload
      );
    case STRING.UPDATE_EVENT:
      return state.map((event) =>
        event.extendedProps._id !== action.payload.extendedProps._id
          ? event
          : action.payload
      );
    default:
      return state;
  }
};

export default event;
