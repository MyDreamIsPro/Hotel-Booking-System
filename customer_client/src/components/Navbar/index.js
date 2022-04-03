import { useEffect, useState } from "react";
import PropTypes from "prop-types";
//UI lib
import {
  Container,
  IconButton,
  Stack,
  Typography,
  styled,
  AppBar,
  Toolbar,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// logic lib
import { Link as RouterLink, useLocation } from "react-router-dom";
// logic custom
import { INTEGER, STRING } from "../../constants";
import AccountPopover from "../Popover/Account";

//#region CSS
const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: INTEGER.APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    height: INTEGER.APP_BAR_DESKTOP,
  },
}));

const NavbarStyle = styled(Container)(({ theme }) => ({
  height: "100%",
  display: "flex",
  position: "relative",
  [theme.breakpoints.down(956)]: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MenuStyle = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: 40,
  [theme.breakpoints.down(956)]: {
    display: "none",
  },
}));

const LinkStyle = styled(Link)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
}));

const AvatarStyle = styled(Stack)(({ theme }) => ({
  position: "absolute",
  right: 0,
  display: "none",
  [theme.breakpoints.down(956)]: {
    display: "flex",
  },
}));

const AvatarStyle2 = styled(Stack)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down(956)]: {
    display: "none",
  },
}));

const BurgerStyle = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 0,
  display: "none",
  [theme.breakpoints.down(956)]: {
    display: "flex",
  },
}));
//#endregion

const links = [
  {
    title: "TRANG CHỦ",
    link: "/",
  },
  {
    title: "ĐẶT CHỖ",
    link: "/booking",
  },
];

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  const [active, setActive] = useState(false);
  const pathname = useLocation().pathname;
  const border = active ? "4px solid #000" : "4px solid #FFF";
  useEffect(() => {
    changeBackground();
    // adding the event when scroll change Logo
    window.addEventListener("scroll", changeBackground);
  });

  const changeBackground = () => {
    if (window.scrollY >= 120) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  const isAuthenticated = localStorage.getItem(
    STRING.LOCAL_STORAGE_PROFILE_KEY
  );

  return (
    <AppBar
      elevation={active ? 5 : 0}
      style={{
        backgroundColor: active ? "#FFF" : "#1C1C1C",
        transition: "background-color .4s ease",
      }}
    >
      <ToolbarStyle>
        <NavbarStyle maxWidth="xl">
          <Link component={RouterLink} to="/" style={{ height: "100%" }}>
            <img src="/static/logo.jpg" alt="logo" style={{ height: "100%" }} />
          </Link>
          <BurgerStyle
            style={{ color: active ? "#000" : "#FFF" }}
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <MenuIcon />
          </BurgerStyle>

          <AvatarStyle>
            <AccountPopover iconColor={active ? "#000" : "#FFF"} />
          </AvatarStyle>

          <MenuStyle direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={5} alignItems="center">
              {links.map((item, index) => (
                <LinkStyle
                  key={index}
                  component={RouterLink}
                  underline="none"
                  to={item.link}
                  style={{
                    borderBottom: pathname === item.link ? border : "none",
                    transition: "border-color .5s ease",
                  }}
                >
                  <Typography
                    variant="body2"
                    color={active ? "#000" : "#FFF"}
                    style={{
                      transition: "color .5s ease",
                    }}
                  >
                    {item.title}
                  </Typography>
                </LinkStyle>
              ))}
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <AvatarStyle2>
                <AccountPopover iconColor={active ? "#000" : "#FFF"} />
              </AvatarStyle2>
            </Stack>
          </MenuStyle>
        </NavbarStyle>
      </ToolbarStyle>
    </AppBar>
  );
};

Navbar.propTypes = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
};

export default Navbar;
