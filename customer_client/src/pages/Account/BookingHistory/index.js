import { useEffect, useState, useContext } from "react";
// UI lib
import { Box, Button, Typography } from "@mui/material";
// UI custom
import Filter from "./Filter";
import Item from "./Item";
import LoadingItem from "./LoadingItem";
import CancelDialog from "./CancelBookingDialog";
// logic lib
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationContext from "../../../context/Context";
// logic custom
import { getAllBookingByUser } from "../../../redux/actions/booking";
import { STRING } from "../../../constants";
//#region CSS
//#endregion

//----------------------------
const BookingHistory = () => {
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState();

  const bookingList = useSelector((state) => state.booking);
  const userId = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  )._id;

  useEffect(() => {
    let isMounted = true;
    dispatch(
      getAllBookingByUser(
        userId,
        () => {
          if (isMounted) {
            setIsLoading(false);
          }
        },
        (needLogin, message) => {
          if (isMounted) {
            context.setNotification({
              type: "error",
              content: message,
            });
            context.setOpen(true);
            setIsLoading(false);
            if (needLogin) navigate("/login", { replace: true });
          }
        }
      )
    );

    return () => (isMounted = false);
  }, [dispatch, context]);

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
            <Item
              data={item}
              key={item._id}
              setId={setId}
              setOpenCancelDialog={setOpenCancelDialog}
            />
          ))}
          <CancelDialog
            open={openCancelDialog}
            setOpen={setOpenCancelDialog}
            id={id}
            setId={setId}
          />
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
