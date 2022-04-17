// UI lib
import {
  Box,
  Divider,
  Stack,
  styled,
  Typography,
  Container,
  Link,
} from "@mui/material";
// UI custom
import Page from "../../components/Page";
import Slider from "./Slider";
// logic lib
import { Link as RouterLink } from "react-router-dom";
// logic custom

//-----------------------------------------------------
//#region CSS

const Frame = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    height: "auto",
  },
}));

const HalfFrame = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "100%",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const ResortFrame = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "90vh",
  position: "relative",
}));

const LeftResortFrame = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 100,
  height: "100%",
  width: 500,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    left: 0,
  },
}));

const RightResortFrame = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 100,
  height: "100%",
  width: 500,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    right: 0,
  },
}));

const InnerResortFrame = styled(Stack)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  cursor: "default",
  padding: 20,
}));

const TypoStyle = styled(Typography)({
  textAlign: "center",
});

//#endregion

const Home = () => {
  return (
    <Page title="Trang chủ | TuanVQ" style={{ paddingTop: 0 }}>
      {/* BANNER */}
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            background:
              "linear-gradient(270deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.54) 54.29%,rgba(0,0,0,0.62) 61%)",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            style={{
              height: "100%",
              width: "100%",
              paddingLeft: "8%",
              cursor: "default",
            }}
            spacing={2}
          >
            <Typography variant="h3" color="#FFF">
              KHÁCH SẠN, KHU NGHỈ DƯỠNG & HƠN THẾ NỮA
            </Typography>
            <Typography variant="h6" color="#FFF">
              Nhận giá tốt nhất cho trên 80.000 chỗ nghỉ
            </Typography>
            <Link
              component={RouterLink}
              to="/hotel"
              underline="none"
              style={{
                padding: 10,
                backgroundColor: "#FFF",
                color: "#000",
              }}
            >
              ĐẶT CHỖ NGAY
            </Link>
          </Stack>
        </div>
        <img
          src="/static/home/banner.jpg"
          alt="banner"
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      </Box>
      {/* INTRODUCTION */}
      <Frame direction="row">
        <HalfFrame sx={{ backgroundColor: "#FBFBFB" }}>
          <Stack
            style={{ padding: 40 }}
            height="100%"
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <img
              src="/static/logo.jpg"
              alt="logo"
              height={90}
              width={90}
              style={{ objectFit: "cover" }}
            />
            <TypoStyle variant="body1">
              CHÀO MỪNG ĐẾN MỚI TUANVU COTO HOTEL
            </TypoStyle>
            <TypoStyle variant="h5">
              Tiêu chuẩn cho khách sạn, resort sang trọng ở Việt Nam
            </TypoStyle>
            <TypoStyle variant="body2">
              Conceived by the Fernando family, Sri Lankan tea producers &
              founders of Dilmah Ceylon Tea, Resplendent Ceylon’s collection of
              small, luxury resorts offer the discerning traveler a remarkable
              circuit across Sri Lanka, with a range of authentic experiences,
              while contributing towards local communities & the environment
              through the MJF Foundation & Dilmah Conservation.
            </TypoStyle>
            <TypoStyle variant="body2">
              Conceived by the Fernando family, Sri Lankan tea producers &
              founders of Dilmah Ceylon Tea, Resplendent Ceylon’s collection of
              small, luxury resorts offer the discerning traveler a remarkable
              circuit across Sri Lanka, with a range of authentic experiences,
              while contributing towards local communities & the environment
              through the MJF Foundation & Dilmah Conservation.
            </TypoStyle>
          </Stack>
        </HalfFrame>
        <HalfFrame>
          <img
            src="/static/home/home_1.jpg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="banner"
          />
        </HalfFrame>
      </Frame>
      {/* Resort */}
      <Box style={{ width: "100%", backgroundColor: "#F4F4F4" }}>
        <Container maxWidth="xl">
          <Stack
            direction="column"
            sx={{ paddingY: 3 }}
            spacing={2}
            alignItems="center"
          >
            <TypoStyle variant="h6">RESORT</TypoStyle>
            <TypoStyle variant="body1">
              Tận hưởng mùa hè không thể nào quên cùng TUANVU COTO HOTEL, với
              trải nghiệm nghỉ dưỡng đỉnh cao và những cuộc vui bất tận bên
              người thân yêu!
            </TypoStyle>
            <Divider
              style={{ backgroundColor: "gray", height: 2, width: 200 }}
            />
          </Stack>
        </Container>
      </Box>
      <ResortFrame>
        <img
          src="/static/home/home_2.jpg"
          alt="banner"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
        <LeftResortFrame direction="row" alignItems="center">
          <InnerResortFrame direction="column" spacing={2} alignItems="center">
            <Typography variant="h6" color="#000">
              RESORT BÁN ĐẢO SƠN TRÀ
            </Typography>
            <Typography variant="body2" color="#000" textAlign="center">
              Tận hưởng mùa hè không thể nào quên cùng TUANVU HOTEL, với trải
              nghiệm nghỉ dưỡng đỉnh cao và những cuộc vui bất tận bên người
              thân yêu!
            </Typography>
            <Divider
              style={{ backgroundColor: "gray", height: 2, width: "40%" }}
            />
          </InnerResortFrame>
        </LeftResortFrame>
      </ResortFrame>
      <ResortFrame>
        <img
          src="/static/home/home_3.jpg"
          alt="banner"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
        <RightResortFrame direction="row" alignItems="center">
          <InnerResortFrame direction="column" spacing={2} alignItems="center">
            <Typography variant="h6" color="#000">
              RESORT NHA TRANG
            </Typography>
            <Typography variant="body2" color="#000" textAlign="center">
              Tận hưởng mùa hè không thể nào quên cùng TUANVU HOTEL, với trải
              nghiệm nghỉ dưỡng đỉnh cao và những cuộc vui bất tận bên người
              thân yêu!
            </Typography>
            <Divider
              style={{ backgroundColor: "gray", height: 2, width: "40%" }}
            />
          </InnerResortFrame>
        </RightResortFrame>
      </ResortFrame>
      <ResortFrame>
        <img
          src="/static/home/home_4.jpg"
          alt="banner"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
        <LeftResortFrame direction="row" alignItems="center">
          <InnerResortFrame direction="column" spacing={2} alignItems="center">
            <Typography variant="h6" color="#000">
              RESORT PHÚ QUỐC
            </Typography>
            <Typography variant="body2" color="#000" textAlign="center">
              Tận hưởng mùa hè không thể nào quên cùng TUANVU HOTEL, với trải
              nghiệm nghỉ dưỡng đỉnh cao và những cuộc vui bất tận bên người
              thân yêu!
            </Typography>
            <Divider
              style={{ backgroundColor: "gray", height: 2, width: "40%" }}
            />
          </InnerResortFrame>
        </LeftResortFrame>
      </ResortFrame>
      {/* HOTEL */}
      <Slider />
      {/* AUTH */}
      <Box
        style={{
          width: "100%",
          height: "70vh",
          marginBottom: 50,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          cursor: "default",
        }}
      >
        <Container
          style={{
            position: "absolute",
            top: 0,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
          maxWidth="lg"
        >
          <Typography variant="h4" color="#FFF">
            Tham gia ngay
          </Typography>
          <Typography
            variant="body1"
            color="#FFF"
            style={{ paddingTop: 10, paddingBottom: 20 }}
          >
            Mức giá độc quyền, tích điểm và hơn thế nữa. Đăng ký miễn phí ngay
            hôm nay
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link
              component={RouterLink}
              to="/login"
              underline="none"
              sx={{
                color: "#FFF",
                py: 1,
                px: 2,
                border: "1px solid #FFF",
              }}
            >
              Đăng nhập
            </Link>
            <Link
              component={RouterLink}
              to="/register"
              underline="none"
              sx={{
                color: "#FFF",
                backgroundColor: "#000",
                py: 1,
                px: 2,
              }}
            >
              Đăng ký
            </Link>
          </Stack>
        </Container>
        <Box
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, .4  )",
            position: "absolute",
            top: 0,
            zIndex: 2,
          }}
        ></Box>
        <img
          src="/static/home/auth.jpg"
          alt="banner"
          style={{
            zIndex: 1,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
          }}
        />
      </Box>
    </Page>
  );
};

export default Home;
