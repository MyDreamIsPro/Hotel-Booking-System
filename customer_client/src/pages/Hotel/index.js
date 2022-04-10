// UI lib
import { Box, Typography, styled, Stack, Divider } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import Content from "./Content";
// logic lib

// logic custom

//#region CSS
const BannerStyle = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 64px)",
  width: "100%",
  position: "relative",
  [theme.breakpoints.down(600)]: {
    height: "calc(100vh - 56px)",
  },
}));

const InfoStyle = styled(Stack)({
  background:
    "linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,.05) 5%,rgba(0,0,0,.9))",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  paddingTop: 30,
  flexDirection: "column",
  alignItems: "center",
});

const InfoInner = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid #FFF",
  paddingBottom: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(1080)]: {
    flexDirection: "column",
  },
}));

const DividerStyle = styled(Divider)(({ theme }) => ({
  width: 1,
  height: "100%",
  background: "#FFF",
  marginLeft: 10,
  marginRight: 10,
  [theme.breakpoints.down(1080)]: {
    display: "none",
  },
}));

const BannerImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

//#endregion

//----------------------------

const Hotel = () => {
  return (
    <Page title="Khách sạn | TuanVQ">
      <BannerStyle>
        <InfoStyle>
          <Typography variant="h3" color="#FFF" marginBottom={2}>
            COTO EMPIRE NHA TRANG
          </Typography>
          <InfoInner>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Iconify
                icon="ep:location"
                color="#FFF"
                style={{ marginRight: 5 }}
              />
              <Typography variant="body1" color="#FFF" textAlign="center">
                46 Đường Lê Thánh Tôn, phường Lộc Thọ, thành phố Nha Trang
              </Typography>
            </Stack>
            <DividerStyle orientation="vertical" />
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Iconify
                icon="clarity:phone-handset-line"
                color="#FFF"
                style={{ marginRight: 5 }}
              />
              <Typography variant="body1" color="#FFF" textAlign="center">
                <a
                  href="tel:(+84) 258 359 9888"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  (+84) 258 359 9888
                </a>
              </Typography>
            </Stack>
            <DividerStyle orientation="vertical" />
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Iconify
                icon="fluent:mail-48-regular"
                color="#FFF"
                style={{ marginRight: 5 }}
              />
              <Typography variant="body1" color="#FFF" textAlign="center">
                coto.support@tuanvq.com
              </Typography>
            </Stack>
          </InfoInner>
        </InfoStyle>
        <BannerImage src="/static/hotel/banner.jpg" alt="banner" />
        <Stack
          style={{
            position: "absolute",
            bottom: 15,
            left: 15,
            padding: "10px 20px",
            borderRadius: 4,
            color: "#FFF",
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          flexDirection="row"
          alignItems="center"
          onClick={() => alert("DMM")}
        >
          <Iconify icon="bi:image" style={{ marginRight: 10 }} />
          <Typography>ẢNH</Typography>
        </Stack>
      </BannerStyle>
      <Content />
    </Page>
  );
};

export default Hotel;
