import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
// logic lib
import { Link as RouterLink } from "react-router-dom";
// logic
import { INTEGER } from "../../constants";
import { Avatar, Box, Container, IconButton } from "@mui/material";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  justifyContent: "center",
  height: INTEGER.APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    height: INTEGER.APP_BAR_DESKTOP,
  },
}));

const AvatarWrapper = styled(IconButton)({
  position: "absolute",
  right: 25,
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  width: 38,
  height: 38,
  [theme.breakpoints.up("lg")]: {
    width: 50,
    height: 50,
  },
}));

const LogoWrapper = styled(Box)({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  zIndex: 9,
});

const Navbar = () => {
  return (
    <AppBarStyle>
      <ToolbarStyle>
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            justifyContent: "center",
            display: "flex",
            position: "relative",
            alignItems: "center",
          }}
        >
          <LogoWrapper>
            <Link
              to="/"
              component={RouterLink}
              underline="none"
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 10,
              }}
            />
            <img src="/static/logo.png" sx={{ height: "100%" }} />
          </LogoWrapper>
          <AvatarWrapper>
            <AvatarStyle src="/static/venom.jpg"></AvatarStyle>
          </AvatarWrapper>
        </Container>
      </ToolbarStyle>
    </AppBarStyle>
  );
};

export default Navbar;
