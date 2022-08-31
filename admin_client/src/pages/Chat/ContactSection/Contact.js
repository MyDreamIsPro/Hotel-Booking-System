import { ButtonBase, Stack, styled, Typography } from "@mui/material";

// logic lib
const RootContainer = styled("div")((theme) => ({
  width: "100%",
  backgroundColor: "#FFF",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 10,
}));
const AvatarSection = styled("div")((theme) => ({
  width: "18%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "gray",
}));
// logic custom
//----------------------------

const Contact = ({ user_id, data, setCurrentContact }) => {
  const changeCurrentContact = () => setCurrentContact(data);
  const getConversationImage = () => {
    return data.users[0]._id === user_id
      ? {
          name: data.users[1].full_name,
          profile_image: data.users[1].profile_image,
        }
      : {
          name: data.users[0].full_name,
          profile_image: data.users[0].profile_image,
        };
  };
  const room_info = data.private
    ? getConversationImage()
    : {
        name: data.name,
        profile_image: "/static/message.png",
      };

  return (
    <ButtonBase style={{ width: "100%" }} onClick={changeCurrentContact}>
      <RootContainer>
        <AvatarSection>
          <img
            // src={data.profile_image}
            src={room_info.profile_image}
            alt="contact image"
            style={{
              // width: "95%",
              height: 50,
              width: 50,
              borderRadius: "50%",
              objectFit: "contain",
              backgroundColor: "gray",
            }}
          />
        </AvatarSection>
        <div style={{ width: "80%", marginLeft: 15 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {room_info.name}
            </Typography>
            <Typography variant="caption">21:01</Typography>
          </div>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            <Typography textAlign="left" noWrap variant="body2">
              {user_id === data.last_user._id && "Bạn: "}
              {data.last_message.content}
            </Typography>
          </div>
        </div>
      </RootContainer>
    </ButtonBase>
  );
};

export default Contact;
