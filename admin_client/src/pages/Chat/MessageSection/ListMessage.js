import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { styled } from "@mui/material";
import { INTEGER } from "../../../constants";

const RootContainer = styled("div")({
  width: "100%",
  height: `calc(100% - ${INTEGER.MESSAGE_ACTION_HEIGHT}px - ${INTEGER.MESSAGE_HEADER_HEIGHT}px)`,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "7px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D7DBDF",
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const ListMessage = ({ listMessage, sender }) => {
  const messageEndRef = useRef();
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);
  return (
    <RootContainer>
      {listMessage.map((item, index) => (
        <Message
          key={item._id}
          data={item}
          type={item.sender._id === sender ? "right" : "left"}
        />
      ))}
      <div ref={messageEndRef}></div>
    </RootContainer>
  );
};

export default ListMessage;
