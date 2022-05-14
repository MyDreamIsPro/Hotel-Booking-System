import { Box, Typography, styled, Stack, Link } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import Iconify from "../../../components/Iconify";

import { Link as RouterLink } from "react-router-dom";
import { formatNumber } from "../../../utils/Number";
import { formatDate } from "../../../utils/Date";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  marginBottom: 25,
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  height: 210,
  [theme.breakpoints.down(922)]: {
    flexDirection: "column",
    height: "fit-content",
  },
}));
const ImageSection = styled("div")(({ theme }) => ({
  width: "30%",
  height: "100%",
  backgroundColor: "red",
  marginRight: 20,
  [theme.breakpoints.down(922)]: {
    width: "100%",
    height: 200,
  },
}));
const InfoSection = styled("div")(({ theme }) => ({
  width: "70%",
  height: "100%",
  padding: "10px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down(922)]: {
    width: "100%",
    paddingLeft: 20,
  },
  [theme.breakpoints.down(672)]: {
    flexDirection: "column",
  },
}));

const InfoSide = styled("div")(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down(672)]: {
    width: "100%",
  },
}));
const DateSide = styled("div")(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down(672)]: {
    width: "100%",
  },
}));

const HotelName = styled(Link)(({ theme }) => ({
  color: "#252525",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

//#endregion
const DATE_LINE = [
  { text: "Đặt phòng", date: "12/02/2022" },
  { text: "Nhận phòng", date: "12/02/2022" },
  { text: "Trả phòng", date: "12/02/2022" },
];

const STATUS = [
  {},
  { text: "Sắp tới", icon: "bytesize:clock", color: "#B78103" },
  { text: "Hoàn tất", icon: "eva:checkmark-circle-fill", color: "#00AB55" },
  { text: "Đã hủy", icon: "ic:outline-cancel", color: "#FF4842" },
];
const Item = ({ data }) => {
  const booking_status = 2;
  return (
    <RootStyle boxShadow={3}>
      <ImageSection>
        <img
          src={data.hotel.images[0]}
          alt="banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </ImageSection>
      <InfoSection>
        {/* INFO SIDE */}
        <InfoSide>
          <HotelName
            variant="h4"
            component={RouterLink}
            to={`/hotel/${data.hotel._id}`}
            underline="hover"
          >
            {data.hotel.name}
          </HotelName>
          <Typography variant="body1">
            Mã số đặt phòng:{" "}
            <span style={{ fontWeight: "bold" }}>688939900</span>
          </Typography>
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="body1" mr={0.5}>
              Tổng tiền:
            </Typography>
            <Typography variant="h5" color="primary" mr={0.5}>
              {formatNumber(data.amount)}
            </Typography>
            <Typography variant="body1">VNĐ</Typography>
          </Stack>
          <Typography>
            Thanh toán: <span style={{ fontWeight: "bold" }}>VISA</span>
          </Typography>
          <Typography>
            Số phòng: <span style={{ fontWeight: "bold" }}>4</span>
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>{data.adult}</span> Người lớn -{" "}
            <span style={{ fontWeight: "bold" }}>{data.kid}</span> Trẻ em -{" "}
            <span style={{ fontWeight: "bold" }}>{data.baby}</span> Em bé
          </Typography>
          <Stack flexDirection="row" alignItems="center">
            <Iconify
              icon={STATUS[data.status].icon}
              style={{
                width: 20,
                height: 20,
                color: STATUS[data.status].color,
              }}
            />
            <Typography
              variant="body1"
              ml={0.5}
              color={STATUS[data.status].color}
              fontWeight="bold"
            >
              {STATUS[data.status].text}
            </Typography>
          </Stack>
        </InfoSide>
        {/* DATE SIDE */}
        <DateSide>
          <Timeline position="left">
            <TimelineItem>
              <TimelineOppositeContent style={{ flex: 0.1 }}>
                {formatDate(data.created_date, "/")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Đặt phòng</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent style={{ flex: 0.1 }}>
                {formatDate(data.effective_from, "/")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Nhận phòng</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent style={{ flex: 0.1 }}>
                {formatDate(data.effective_to, "/")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Trả phòng</TimelineContent>
            </TimelineItem>
          </Timeline>
        </DateSide>
      </InfoSection>
    </RootStyle>
  );
};

export default Item;
