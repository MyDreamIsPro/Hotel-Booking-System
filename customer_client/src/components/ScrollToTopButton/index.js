import { useEffect, useState } from "react";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import { IconButton } from "@mui/material";
const ScrollToTopButton = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    changeDisplay();
    // adding the event when scroll
    window.addEventListener("scroll", changeDisplay);
  });

  const changeDisplay = () => {
    if (window.scrollY >= 120) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <IconButton
      onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
      style={{
        color: "#000",
        backgroundColor: "#FFF",
        boxShadow: "0 0 5px 1px gray",
        position: "fixed",
        zIndex: 10,
        right: 15,
        bottom: active ? 15 : 0,
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden",
        transition: "opacity .3s ease, visibility .3s ease, bottom .3s ease",
        width: 55,
        height: 55,
      }}
    >
      <ArrowUpwardSharpIcon style={{ fontSize: 40 }} />
    </IconButton>
  );
};

export default ScrollToTopButton;
