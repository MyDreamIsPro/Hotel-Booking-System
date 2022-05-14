import * as api from "../../api/room_type";
import { STRING } from "../../constants";

//ACTION creators
export const getAvailableRoomType =
  (hotel_id, filter, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAvailableRoomType(hotel_id, filter);
      dispatch({ type: STRING.GET_AVAILABLE_ROOM_TYPE, payload: data });
      performSuccess(data.length);
    } catch (error) {
      if (!error.response)
        performFailure("Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau");
      else performFailure(error.response.data);
    }
  };
