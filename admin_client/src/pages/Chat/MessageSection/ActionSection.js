import { useState } from "react";
import { IconButton } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { INTEGER } from "../../../constants";

const ActionSection = ({ socket, sender, group }) => {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    if (message === "") return;
    if (!group) return alert("Vui lòng chọn người gửi");

    const message_package = {
      sender: sender,
      group: group,
      content: message.trim(),
      created_date: new Date(),
    };

    socket.emit("send-message", message_package);
    setMessage("");
  };
  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };
  return (
    <div
      style={{
        borderTop: "2px solid #637381",
        height: INTEGER.MESSAGE_ACTION_HEIGHT,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <IconButton>
        <Iconify icon="line-md:emoji-smile" style={{ width: 30, height: 30 }} />
      </IconButton>
      <input
        style={{
          margin: "0 10px",
          width: "calc(100% - 110px)",
          outline: "none",
          border: "none",
          backgroundColor: "transparent",
          fontSize: 17,
        }}
        type="text"
        onKeyDown={onEnterPress}
        name="message"
        autoComplete="off"
        placeholder="Nhập tin nhắn..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <IconButton>
        <Iconify icon="ri:attachment-2" style={{ width: 30, height: 30 }} />
      </IconButton>
      <IconButton onClick={handleSendMessage}>
        <Iconify
          icon="fluent:send-20-filled"
          style={{ width: 30, height: 30 }}
          sx={message !== "" ? { color: "primary.main" } : {}}
        />
      </IconButton>
    </div>
  );
};

export default ActionSection;
