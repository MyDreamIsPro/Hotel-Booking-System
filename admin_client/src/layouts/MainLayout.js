// UI lib
import { styled } from "@mui/material";

// UI custom
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// logic lib
import { Outlet } from "react-router-dom";
import { useState } from "react";

// logic custom

//#region CSS
const RootStyle = styled("div")({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
});
const MainStyle = styled("div")({
  flexGrow: 1,
});
//#endregion

//----------------------------
const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <RootStyle>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <MainStyle>
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

export default MainLayout;
