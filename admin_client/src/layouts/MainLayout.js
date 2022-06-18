// UI lib
import { styled } from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// UI custom
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// logic lib
// import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { useState } from "react";

// logic custom
import { INTEGER } from "../constants";
//#region CSS
const RootStyle = styled("div")({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
});
const MainStyle = styled("div")(({ theme }) => ({
  // flexGrow: 1,
  width: `calc(100% - ${INTEGER.DRAWER_WIDTH}px)`,
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));
// const StyledSnackbarProvider = styled(SnackbarProvider)`
//   &.SnackbarItem-variantError {
//     background: #ff4842;
//   }
//   ,
//   &.SnackbarItem-variantWarning {
//     background-color: #ffc107;
//   }
//   ,
//   &.SnackbarItem-variantSuccess {
//     background-color: #00ab55;
//   }
//   ,
//   &.SnackbarItem-variantInfo {
//     background-color: #1890ff;
//   }
// `;
//#endregion

//----------------------------
const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    // <StyledSnackbarProvider
    //   iconVariant={{
    //     success: <CheckCircleOutlineIcon style={{ marginRight: 5 }} />,
    //     error: <ErrorOutlineIcon style={{ marginRight: 5 }} />,
    //     warning: <WarningAmberIcon style={{ marginRight: 5 }} />,
    //     info: <InfoOutlinedIcon style={{ marginRight: 5 }} />,
    //   }}
    //   anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    //   maxSnack={2}
    // >
    <RootStyle>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <MainStyle>
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Outlet />
      </MainStyle>
    </RootStyle>
    // </StyledSnackbarProvider>
  );
};

export default MainLayout;
