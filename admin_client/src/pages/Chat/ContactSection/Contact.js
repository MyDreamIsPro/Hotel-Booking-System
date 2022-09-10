// UI lib
import { ButtonBase, styled, Typography } from "@mui/material";
// UI custom
// logic lib
import { formatDateForChat } from "../../../utils/date";
// logic custom
//#region CSS
const RootContainer = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#FFF",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 5,
  padding: 10,
}));
const AvatarSection = styled("div")((theme) => ({
  width: "18%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
//#endregion
//----------------------------
const Contact = ({ user_id, data, currentContactId, setSearchParams }) => {
  const getConversationImage = () => {
    return data.users[0]._id === user_id
      ? {
          id: data._id,
          name: data.users[1].full_name,
          profile_image: data.users[1].profile_image,
        }
      : {
          id: data._id,
          name: data.users[0].full_name,
          profile_image: data.users[0].profile_image,
        };
  };
  const room_info = data.private
    ? getConversationImage()
    : {
        id: data._id,
        name: data.name,
        profile_image: "/static/message.png",
      };
  const changeCurrentContact = () => {
    setSearchParams({ t: data._id });
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    alert("right click");
    const xPos = e.pageX + "px";
    const yPos = e.pageY + "px";
    console.log(xPos, yPos);
  };

  return (
    <ButtonBase
      style={{ width: "100%", borderRadius: 5 }}
      onClick={changeCurrentContact}
      onContextMenu={handleRightClick}
    >
      <RootContainer
        sx={
          currentContactId === data._id && {
            bgcolor: "primary.main",
            color: "#FFF",
          }
        }
      >
        <AvatarSection>
          <img
            // src={data.profile_image}
            src={room_info.profile_image}
            alt="contact"
            style={{
              // width: "95%",
              height: 50,
              width: 50,
              borderRadius: "50%",
              objectFit: "cover",
              // backgroundColor: "gray",
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
            <Typography variant="caption">
              {formatDateForChat(data.last_message.created_date)}
            </Typography>
          </div>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            <Typography textAlign="left" noWrap variant="body2">
              {user_id === data.last_user && "Bạn: "}
              {data.last_message.content}
            </Typography>
          </div>
        </div>
      </RootContainer>
    </ButtonBase>
  );
};

export default Contact;
