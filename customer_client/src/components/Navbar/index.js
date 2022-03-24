import { useEffect, useState } from "react";
//UI lib
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
// logic lib
import { Link as RouterLink } from "react-router-dom";
// logic
import { INTEGER } from "../../constants";
import { Container, Stack, Typography } from "@mui/material";

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  justifyContent: "center",
  backgroundColor: "transparent",
  height: INTEGER.APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    height: INTEGER.APP_BAR_DESKTOP,
  },
}));

const links = [
  {
    title: "TRANG CHỦ",
    link: "/",
  },
  {
    title: "KHÁCH SẠN",
    link: "/login",
  },
  {
    title: "KHU NGHỈ DƯỠNG",
    link: "/login",
  },
  {
    title: "KHUYẾN MÃI",
    link: "/register",
  },
];

const Navbar = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    changeBackground();
    // adding the event when scroll change Logo
    window.addEventListener("scroll", changeBackground);
  });
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <AppBar
      elevation={0}
      style={{
        backgroundColor: active ? "#FFF" : "rgba(0, 0, 0, 0.5)",
        transition: "background-color .5s ease, height .5s ease",
      }}
    >
      <ToolbarStyle>
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ flexGrow: 1 }}
          >
            <Stack direction="row" spacing={5} alignItems="center">
              <Link component={RouterLink} to="/" style={{ height: "100%" }}>
                <img src="/static/logo.jpg" style={{ height: "100%" }} />
              </Link>
              {links.map((item, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  underline="none"
                  to={item.link}
                >
                  <Typography
                    variant="body2"
                    color={active ? "#000" : "#FFF"}
                    style={{ transition: "color .5s ease" }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Link component={RouterLink} underline="none" to="/login">
                <Typography
                  variant="body2"
                  color={active ? "#000" : "#FFF"}
                  style={{ transition: "color .5s ease" }}
                >
                  ĐĂNG NHẬP
                </Typography>
              </Link>
              <Link component={RouterLink} underline="none" to="/register">
                <Typography
                  variant="body2"
                  color={active ? "#000" : "#FFF"}
                  style={{ transition: "color .5s ease" }}
                >
                  ĐĂNG KÝ
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </ToolbarStyle>
    </AppBar>
  );
};

export default Navbar;
