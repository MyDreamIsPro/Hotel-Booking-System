import { Outlet } from "react-router-dom";
// UI lib
import { styled } from "@mui/material/styles";
// UI custom
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
// ----------------------------------------------------------------------

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100%",
  overflow: "hidden",
  position: "relative",
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <RootStyle>
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <MainStyle>
        <Outlet />
        <Footer />
        <ScrollToTopButton />
      </MainStyle>
    </RootStyle>
  );
}
