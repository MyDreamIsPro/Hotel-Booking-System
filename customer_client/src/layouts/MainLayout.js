import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
// custom
import Navbar from "../components/Navbar";
// logic
import { INTEGER } from "../constants";

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: INTEGER.APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: INTEGER.APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  return (
    <RootStyle>
      <Navbar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
