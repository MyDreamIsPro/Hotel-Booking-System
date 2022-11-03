import * as api from "../../api/event";
import { STRING } from "../../constants";

//ACTION creators
export const createEvent =
  (event, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createEvent(event);
      dispatch({ type: STRING.CREATE_EVENT, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const getAllEventByUser =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllEventByUser();
      dispatch({ type: STRING.GET_ALL_EVENT, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const deleteEvent =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteEvent(id);
      dispatch({ type: STRING.DELETE_EVENT, payload: id });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          error.response.data ||
            "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const updateEvent =
  (id, event, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateEvent(id, event);
      dispatch({ type: STRING.UPDATE_EVENT, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
