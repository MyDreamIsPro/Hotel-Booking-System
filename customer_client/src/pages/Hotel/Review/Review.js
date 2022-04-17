import { useState } from "react";
// UI lib
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  CircularProgress,
  styled,
  Grid,
  TextField,
  MenuItem,
  Divider,
  Pagination,
} from "@mui/material";
// UI custom
import Iconify from "../../../components/Iconify";
import CommentList from "./CommentList";
// logic lib

// logic custom

//#region CSS
const RootScore = styled(Grid)(({ theme }) => ({
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-around",
  },
}));
const ScoreBox = styled(Grid)(({ theme }) => ({
  height: 200,
  borderRadius: 4,
  boxShadow: "0 0 5pt 0pt gray",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: 20,
  [theme.breakpoints.down("md")]: {},
}));
//#endregion

//----------------------------

const data = [
  { text: "Độ sạch sẽ", score: "7,5", value: 75 },
  { text: "Tiện nghi", score: "5,0", value: 50 },
  { text: "Vị trí", score: "2,5", value: 25 },
  { text: "Dịch vụ", score: "9,0", value: 90 },
  { text: "Đáng giá tiền", score: "4,7", value: 47 },
];

const Review = () => {
  const [filterValue, setFilterValue] = useState(1);
  const [commentPage, setCommentPage] = useState(1);
  return (
    <Box
      style={{
        width: "100%",
        paddingBottom: 20,
      }}
    >
      <Typography variant="h4" style={{ marginTop: 30, marginBottom: 15 }}>
        Nhận xét hữu ích cho COTO EMPIRE NHA TRANG
      </Typography>

      {/* OVERALL */}
      <Stack flexDirection="row" style={{ marginBottom: 15 }}>
        <Box
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            height: 70,
            width: 70,
            marginRight: 12,
          }}
        >
          <CircularProgress variant="determinate" value={86} size={60} />
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" backgroundColor="primary">
              9,0
            </Typography>
          </Box>
        </Box>
        <Stack flexDirection="column" justifyContent="space-around">
          <Typography variant="h5">Trên cả tuyệt vời</Typography>
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="body1" style={{ marginRight: 5 }}>
              Dựa trên 890 bài đánh giá
            </Typography>
            <Iconify
              icon="akar-icons:circle-check-fill"
              sx={{ color: "success.main" }}
            />
          </Stack>
        </Stack>
      </Stack>
      {/* DETAIL */}
      <Typography variant="h5" marginBottom={2}>
        Chi tiết
      </Typography>
      <RootScore container>
        {data.map((item, index) => (
          <ScoreBox item key={index} xs={5} md={2.2}>
            <Box
              style={{
                width: "100%",
                display: "flex",
                height: 160,
                justifyContent: "center",
                position: "relative",
                alignItems: "center",
              }}
            >
              <CircularProgress
                variant="determinate"
                value={item.value}
                size={120}
              />
              <Box
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" style={{ cursor: "default" }}>
                  {item.score}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6">{item.text}</Typography>
          </ScoreBox>
        ))}
      </RootScore>
      {/* COMMENT INFO */}

      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="h6">
          Đang hiển thị 890 nhận xét thực từ du khách
        </Typography>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="body1" style={{ marginRight: 10 }}>
            Sắp xếp theo
          </Typography>
          <TextField
            label=""
            name="filter"
            variant="outlined"
            select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <MenuItem value={1}>Gần đây nhất</MenuItem>
            <MenuItem value={2}>Đánh giá, cao đến thấp</MenuItem>
            <MenuItem value={3}>Đánh giá, thấp đến cao</MenuItem>
            <MenuItem value={4}>Hữu ích nhất</MenuItem>
          </TextField>
        </Stack>
      </Stack>
      {/* PAGINATION */}
      <Stack flexDirection="row" justifyContent="center">
        <Pagination
          count={10}
          page={commentPage}
          size="large"
          color="primary"
          onChange={(event, value) => setCommentPage(value)}
        />
      </Stack>

      <Stack
        flexDirection="row"
        justifyContent="center"
        style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
      >
        <Divider
          style={{
            width: "80%",
            borderBottomWidth: 1,
            backgroundColor: "#F4F4F4",
          }}
        />
      </Stack>
      {/* COMMENT LIST */}
      <CommentList />

      {/* PAGINATION */}
      <Stack flexDirection="row" justifyContent="center">
        <Pagination
          count={10}
          page={commentPage}
          size="large"
          color="primary"
          onChange={(event, value) => setCommentPage(value)}
        />
      </Stack>
    </Box>
  );
};

export default Review;
