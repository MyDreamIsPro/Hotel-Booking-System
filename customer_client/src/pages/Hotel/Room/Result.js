// UI lib
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
// UI custom
import Iconify from "../../../components/Iconify";
// logic lib
import { useNavigate } from "react-router-dom";
// logic custom
import { formatDate, getDiffDays } from "../../../utils/Date";
import { formatNumber } from "../../../utils/Number";
import { STRING } from "../../../constants";
import { holdRoom } from "../../../api/room";
import { checkAuth } from "../../../api/user";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  width: "32%",
  height: "fit-content",
  position: "sticky",
  top: 100,
  zIndex: 99,
  borderRadius: 4,
  padding: 15,
  [theme.breakpoints.down(1144)]: {
    display: "none",
  },
}));
const AccordionStyle = styled(Accordion)({
  padding: 0,
  boxShadow: "none",
  border: "none",
  "&:before": {
    display: "none",
  },
});

const AccordionSummaryStyle = styled(AccordionSummary)({
  padding: 0,
});

const AccordionDetailsStyle = styled(AccordionDetails)({
  padding: 0,
});
//#endregion

//----------------------------
const HOLDING_TIME = 1200000; // 20 minutes
const Result = ({
  hotelId,
  hotelName,
  startDate,
  endDate,
  visitor,
  selectedRooms,
  setSelectedRooms,
  setOpenNotEnoughDialog,
  setNotEnoughRooms,
  setOpenAuthenticatedDialog,
}) => {
  const navigate = useNavigate();
  const diffDays = getDiffDays(startDate, endDate);

  const amount =
    selectedRooms.reduce((result, room) => result + room.rent_bill, 0) *
    diffDays;

  const validateBookingInfo = () => {
    if (selectedRooms.length > 0) {
      holdRoom({
        hotel: hotelId,
        selectedRoomTypes: selectedRooms,
        holding_time: HOLDING_TIME,
        date: [startDate, endDate],
      })
        .then((res) => {
          localStorage.setItem(
            STRING.LOCAL_STORAGE_BOOKING_INFO,
            JSON.stringify({
              hotel: hotelId,
              hotelName: hotelName,
              startDate: startDate,
              endDate: endDate,
              visitor: visitor,
              selectedRooms: selectedRooms,
              expire: Date.now() + HOLDING_TIME, //add 10 minutes
              amount: amount,
              roomIds: res.data,
            })
          );
          navigate("/booking");
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            setNotEnoughRooms(err.response.data);
            setOpenNotEnoughDialog(true);
          }
        });
    } else alert("Quý khách vui lòng chọn phòng");
  };
  const handleSetBookingInfo = () => {
    checkAuth()
      .then(() => {
        validateBookingInfo();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setOpenAuthenticatedDialog(true);
        }
      });
  };

  const handleRemoveSelectedRoom = (remove_index) => {
    setSelectedRooms(
      selectedRooms.filter((room, index) => index !== remove_index)
    );
  };
  return (
    <RootStyle boxShadow={3}>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Thông tin đặt phòng
      </Typography>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      <Typography variant="body1" fontWeight="bold">
        {hotelName}
      </Typography>
      {/* SCHEDULE */}
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Box>
          <Typography variant="body2" textAlign="center">
            Nhận phòng
          </Typography>
          <Typography variant="h6" textAlign="center">
            {formatDate(startDate)}
          </Typography>
        </Box>
        <Iconify
          icon="ri:building-line"
          sx={{ width: 30, height: 30, color: "primary.main" }}
        />
        <Box>
          <Typography variant="body2" textAlign="center">
            Trả phòng
          </Typography>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            {formatDate(endDate)}
          </Typography>
        </Box>
      </Stack>
      {/* NUM PEOPLE */}
      <Stack
        style={{ width: "100%" }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body1">
            Người lớn:{" "}
            <span style={{ fontWeight: "bolder" }}>{visitor.adult}</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body1">
            Trẻ em: <span style={{ fontWeight: "bolder" }}>{visitor.kid}</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body1">
            Em bé: <span style={{ fontWeight: "bolder" }}>{visitor.baby}</span>
          </Typography>
        </Box>
      </Stack>
      {/* DURATION */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số đêm</Typography>
        <Typography variant="body1" fontWeight="bold">
          {diffDays + 1} ngày {diffDays} đêm
        </Typography>
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số phòng</Typography>
        <Typography variant="body1" fontWeight="bold">
          {selectedRooms.length}
        </Typography>
      </Stack>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* ROOM LIST */}
      <AccordionStyle defaultExpanded>
        <AccordionSummaryStyle
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Thông tin phòng</Typography>
        </AccordionSummaryStyle>
        <AccordionDetailsStyle>
          {/* LIST */}
          {selectedRooms.length > 0 ? (
            selectedRooms.map((room, index) => (
              <Stack
                key={index}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="body1" style={{ maxWidth: "50%" }}>
                  <span style={{ fontWeight: "bold" }}>Phòng {index + 1}:</span>{" "}
                  {room.name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  {formatNumber(room.rent_bill)} đ
                </Typography>
                <Tooltip title="Xóa" placement="top">
                  <IconButton
                    color="error"
                    style={{ height: 30, width: 30 }}
                    onClick={() => handleRemoveSelectedRoom(index)}
                  >
                    <RemoveIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))
          ) : (
            <Typography variant="body1">Chưa chọn phòng</Typography>
          )}
        </AccordionDetailsStyle>
      </AccordionStyle>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* PRICE */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold">
          Tổng tiền:
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold">
          {formatNumber(amount)} <span style={{ fontSize: 17 }}>đ</span>
        </Typography>
      </Stack>
      {/* BUTTON */}
      <Button
        fullWidth
        onClick={handleSetBookingInfo}
        variant="contained"
        style={{ padding: 8, marginTop: 15, marginBottom: 10, fontSize: 18 }}
      >
        ĐẶT NGAY
      </Button>
    </RootStyle>
  );
};

export default Result;
