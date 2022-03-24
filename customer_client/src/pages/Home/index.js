// UI lib
import {
  Box,
  Divider,
  Stack,
  styled,
  Typography,
  Container,
} from "@mui/material";
// UI custom
import Page from "../../components/Page";

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
  marginBottom: 20,
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

const Home = () => {
  return (
    <Page title="Trang chủ | TuanVQ">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        {/* <Box
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        ></Box> */}
        <img
          src="/static/banner.webp"
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
              height={90}
              width={90}
              style={{ objectFit: "cover" }}
            />
            <TypoStyle variant="body1">
              CHÀO MỪNG ĐẾN MỚI TUANVU COTO RESORT
            </TypoStyle>
            <TypoStyle variant="h5">
              Tiêu chuẩn cho khách sạn, khu nghỉ dưỡng sang trọng ở Việt Nam
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
      {/* RESORT */}
      <Box style={{ width: "100%", backgroundColor: "#F4F4F4" }}>
        <Container maxWidth="xl">
          <Stack
            direction="column"
            sx={{ paddingY: 3 }}
            spacing={2}
            alignItems="center"
          >
            <TypoStyle variant="h6">KHU NGHỈ DƯỠNG</TypoStyle>
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
              KHU NGHỈ DƯỠNG BÁN ĐẢO SƠN TRÀ
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
              KHU NGHỈ DƯỠNG NHA TRANG
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
              KHU NGHỈ DƯỠNG PHÚ QUỐC
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
    </Page>
  );
};

export default Home;
