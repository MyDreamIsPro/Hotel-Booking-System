import { useEffect, useRef, useState } from "react";
// UI lib
import { Button, Stack, Typography, Box, styled } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import ContactSection from "./ContactSection";
import MessageSection from "./MessageSection";
// logic lib
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { io } from "socket.io-client";
// logic custom
import { getListMessage } from "../../api/chat";
import { STRING } from "../../constants";
//#region CSS
const RootContainer = styled(Box)((theme) => ({
  width: "100%",
  height: 540,
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [listMessage, setListMessage] = useState([]);
  const [listContact, setListContact] = useState([]);
  const [currentContact, setCurrentContact] = useState();
  const [info, setInfo] = useState();

  // console.log(searchParams.get("t"));

  useEffect(() => {
    socketRef.current = io(STRING.SERVER_URL, {
      withCredentials: true,
      query: "role=admin",
    });

    socketRef.current.on("get-initial-data", (data) => {
      setInfo({
        _id: data._id,
        full_name: data.full_name,
        profile_image: data.profile_image,
        socket_id: data.socket_id,
      });
      setListContact(data.chat_groups.filter((item) => !item.isEmpty));
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
    if (searchParams.get("t") && info) {
      getListMessage(searchParams.get("t"))
        .then((res) => {
          const group = res.data.group;
          const room_info = group.private
            ? group.users[0]._id === info._id
              ? {
                  id: group._id,
                  name: group.users[1].full_name,
                  profile_image: group.users[1].profile_image,
                }
              : {
                  id: group._id,
                  name: group.users[0].full_name,
                  profile_image: group.users[0].profile_image,
                }
            : {
                id: group._id,
                name: group.name,
                profile_image: "/static/message.png",
              };
          setCurrentContact(room_info);
          setListMessage(res.data.list_message);
        })
        .catch((err) => {
          enqueueSnackbar(err.response.data, { variant: "error" });
        });
    }
  }, [searchParams, info]);

  useEffect(() => {
    socketRef.current.on("new-message", (group) => {
      setListContact((prevList) => {
        const temp = prevList.filter((item) => item._id !== group._id);
        return [group, ...temp];
      });
      if (currentContact?.id === group?._id) {
        setListMessage((prevList) => [...prevList, group.last_message]);
      }
    });

    return () => {
      socketRef.current.off("new-message");
    };
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
          socket={socketRef.current}
          setSearchParams={setSearchParams}
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
