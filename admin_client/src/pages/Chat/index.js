import { useEffect, useRef, useState } from "react";
// UI lib
import { Button, Stack, Typography, Box, styled } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import ContactSection from "./ContactSection";
import MessageSection from "./MessageSection";
// logic lib
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { io } from "socket.io-client";
// logic custom
import { getListMessage } from "../../api/chat";
import { STRING } from "../../constants";
//#region CSS
const RootContainer = styled(Box)((theme) => ({
  width: "100%",
  height: 600,
  borderRadius: 8,
  display: "flex",
  overflow: "hidden",
  backgroundColor: "#FFF",
}));
//#endregion
//----------------------------

const Chat = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const socketRef = useRef();

  const [listMessage, setListMessage] = useState([]);
  const [listContact, setListContact] = useState([]);
  const [currentContact, setCurrentContact] = useState();
  const [info, setInfo] = useState();

  useEffect(() => {
    socketRef.current = io(STRING.SERVER_URL, {
      withCredentials: true,
      query: "role=admin",
    });

    socketRef.current.on("get-info", (data) => {
      setInfo(data);
    });

    socketRef.current.on("get-all-contact", (data) => {
      setListMessage(data.filter((item) => !item.isEmpty));
    });

    socketRef.current.on("add-user", (data) => {
      setListContact((prevList) => {
        if (prevList.some((item) => data._id === item._id)) {
          return prevList.map((item) => (item._id === data._id ? data : item));
        } else {
          return [...prevList, data];
        }
      });
    });

    socketRef.current.on("receive-message-from-room", (data) => {
      setListMessage((prevList) => [...prevList, data]);
    });

    socketRef.current.on("send-message-completed", (data) => {
      setListMessage((prevList) => [...prevList, data]);
    });

    socketRef.current.on("connect_error", (err) => {
      if (err.data && err.data === 401) {
        enqueueSnackbar("Phiên đăng nhập hết hạn", { variant: "error" });
        navigate("/login", { replace: true, state: { returnUrl: "/chat" } });
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentContact) {
      getListMessage(currentContact.id)
        .then((res) => setListMessage(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentContact]);
  return (
    <Page title="Chat">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">CHAT</Typography>
      </Stack>
      <Typography variant="h4">SOCKET: {info?.socket_id}</Typography>
      <Typography variant="h4">MONGO: {info?._id}</Typography>
      <Typography variant="h4">NAME: {info?.full_name}</Typography>
      <RootContainer boxShadow={3}>
        <ContactSection
          user_id={info?._id}
          listContact={listContact}
          setCurrentContact={setCurrentContact}
        />
        <MessageSection
          listMessage={listMessage}
          currentContact={currentContact}
          sender={info?._id}
          socket={socketRef.current}
        />
      </RootContainer>
    </Page>
  );
};

export default Chat;
