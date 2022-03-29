import { STRING } from "../../constants";

export default (state = { auth: null }, action) => {
  switch (action.type) {
    case STRING.LOG_IN:
      localStorage.setItem(
        STRING.LOCAL_STORAGE_PROFILE_KEY,
        JSON.stringify({ ...action.payload })
      );
      return { ...state, auth: action.payload };
    case STRING.SIGN_UP:
      localStorage.setItem(
        STRING.LOCAL_STORAGE_PROFILE_KEY,
        JSON.stringify({ ...action.payload })
      );
      return { ...state, auth: action.payload };
    case STRING.LOG_OUT:
      localStorage.clear();
      return { ...state, auth: null };
    default:
      return state;
  }
};
