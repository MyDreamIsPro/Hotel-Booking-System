import { useEffect, useState } from "react";
// UI lib
import { Box, Button, Typography } from "@mui/material";
// UI custom
import Filter from "./Filter";
import Item from "./Item";
import LoadingItem from "./LoadingItem";
// logic lib
import { Link } from "react-router-dom";
// logic custom
import { getAllBookingByUser } from "../../../api/booking";
import { STRING } from "../../../constants";
//#region CSS
//#endregion

//----------------------------
const BookingHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingList, setBookingList] = useState([]);
  const userId = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  )._id;

  useEffect(() => {
    let isMounted = true;
    getAllBookingByUser(userId)
      .then((res) => {
        if (isMounted) {
          console.log(res.data);
          setBookingList(res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        // if (!error.response || error.response.status !== 401)
        //   performFailure(
        //     false,
        //     "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        //   );
        // else performFailure(true, "Phiên đăng nhập hết hạn");
      });
    return () => (isMounted = false);
  }, []);
  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      {isLoading ? (
        <>
          <LoadingItem />
          <LoadingItem />
          <LoadingItem />
        </>
      ) : bookingList.length > 0 ? (
        <>
          <Filter data={bookingList} />
          {bookingList.map((item) => (
            <Item data={item} key={item._id} />
          ))}
        </>
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/static/hotel_list/no-result.webp"
            alt="no booking"
            style={{ width: "60%" }}
          />
          <Typography variant="h6" mb={1}>
            Quý khách chưa có đơn đặt chỗ nào
          </Typography>
          <Button variant="outlined" component={Link} to="/hotel">
            TÌM PHÒNG NGAY
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BookingHistory;
