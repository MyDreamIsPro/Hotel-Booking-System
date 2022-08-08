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

const Contact = ({ data, setCurrentContact }) => {
  const changeCurrentContact = () => setCurrentContact(data);
  return (
    <ButtonBase style={{ width: "100%" }} onClick={changeCurrentContact}>
      <RootContainer>
        <AvatarSection>
          <img
            src={data.profile_image}
            alt="contact image"
            style={{
              width: "95%",
              borderRadius: "50%",
              objectFit: "cover",
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
              {data.full_name}
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
            <Typography noWrap variant="body2">
              Hi Xoxo [ 5483233192 ], you will be muted until you read the rules
              to the end!
            </Typography>
          </div>
        </div>
      </RootContainer>
    </ButtonBase>
  );
};

export default Contact;
