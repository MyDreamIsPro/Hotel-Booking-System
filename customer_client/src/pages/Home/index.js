// UI lib
import { Box, Container, Typography } from "@mui/material";
import Page from "../../components/Page";

// UI custom
import Filter from "./Filter";

const Home = () => {
  return (
    <Page title="Trang chủ | TuanVQ">
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <img
          src="/static/beach.webp"
          alt="banner"
          style={{
            objectFit: "cover",
            height: 400,
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: 400,
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 2,
          }}
        ></div>
        <Container
          maxWidth="md"
          sx={{
            paddingTop: 3,
            zIndex: 10000,
            position: "relative",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" sx={{ color: "#FFF", textAlign: "center" }}>
            KHÁCH SẠN, KHU NGHỈ DƯỠNG & HƠN THẾ NỮA
          </Typography>
          <Typography variant="h4" sx={{ color: "#FFF" }}>
            Nhận giá tốt nhất cho hơn 10.000 chỗ nghỉ
          </Typography>

          <Filter />
        </Container>
      </Box>
    </Page>
  );
};

export default Home;
