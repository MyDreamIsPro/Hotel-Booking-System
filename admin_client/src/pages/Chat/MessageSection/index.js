import { useState } from "react";
// UI lib
import { Box, styled } from "@mui/material";
// UI custom
import ListMessage from "./ListMessage";
import ActionSection from "./ActionSection";
import MessageHeader from "./MessageHeader";
// logic lib
const RootContainer = styled(Box)((theme) => ({
  width: "75%",
  height: "100%",
}));
// logic custom
//----------------------------

const MessageSection = ({ listMessage, currentContact, sender, socket }) => {
  return (
    <RootContainer>
      <MessageHeader data={currentContact} />
      <ListMessage listMessage={listMessage} sender={sender} />
      <ActionSection
        socket={socket}
        sender={sender}
        receiver={currentContact?._id}
      />
    </RootContainer>
  );
};

export default MessageSection;
