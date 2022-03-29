import { useEffect } from "react";
import PropTypes from "prop-types";
// UI lib
import {
  styled,
  Drawer,
  Box,
  ListItem,
  List,
  ListItemText,
  Link,
  Avatar,
  Typography,
} from "@mui/material";
// logic lib
import { Link as RouterLink, useLocation } from "react-router-dom";
// Logic custom
import useReponsive from "../../theme/useReponsive";
import { INTEGER } from "../../constants";
//--------------------------------------------------

const DrawerInner = styled(Box)(({ theme }) => ({
  width: INTEGER.DRAWER_WIDTH,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const AvatarStyle = styled(Link)({
  width: "90%",
  height: 70,
  backgroundColor: "#1C1C1C",
  borderRadius: 8,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  paddingRight: 10,
  paddingLeft: 10,
});

const data = [
  {
    title: "ĐẶT CHỖ",
    link: "/login",
  },
  {
    title: "KHÁCH SẠN",
    link: "/login",
  },
  {
    title: "KHU NGHỈ DƯỠNG",
    link: "/register",
  },
  {
    title: "KHUYẾN MÃI",
    link: "/",
  },
];

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const isDesktop = useReponsive("up", 956);
  const pathname = useLocation().pathname;
  useEffect(() => {
    if (isDesktop) setOpenSidebar(false);
  }, [isDesktop, setOpenSidebar]);
  useEffect(() => {
    setOpenSidebar(false);
  }, [pathname, setOpenSidebar]);
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openSidebar}
      onClose={() => setOpenSidebar(false)}
    >
      <DrawerInner>
        <Box
          style={{
            width: "100%",
            display: "flex",
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <AvatarStyle component={RouterLink} to="/" underline="none">
            <Avatar style={{ marginRight: 10 }} src="/static/venom.jpg" />
            <Typography
              variant="body1"
              style={{
                color: "#FFF",
              }}
              noWrap
            >
              Hoàng Hoành Anh Tuấn
            </Typography>
          </AvatarStyle>
        </Box>
        <List>
          {data.map((item, index) => (
            <ListItem button component={RouterLink} to={item.link} key={index}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </DrawerInner>
    </Drawer>
  );
};

Sidebar.propTypes = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
};

export default Sidebar;
