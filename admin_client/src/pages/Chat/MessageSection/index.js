import { useState } from "react";
// UI lib
import { Box, styled } from "@mui/material";
// UI custom
import ListMessage from "./ListMessage";
import ActionSection from "./ActionSection";
import HeaderSection from "./HeaderSection";
// logic lib
const RootContainer = styled(Box)(({ theme }) => ({
  width: "70%",
  height: "100%",
  [theme.breakpoints.down(940)]: {
    width: "100%",
  },
}));
// logic custom
//----------------------------

const MessageSection = ({ listMessage, currentContact, sender, socket }) => {
  return (
    <RootContainer>
      <HeaderSection data={currentContact} />
      <ListMessage listMessage={listMessage} sender={sender} />
      <ActionSection
        socket={socket}
        sender={sender}
        group={currentContact?.id}
      />
    </RootContainer>
  );
};

export default MessageSection;
