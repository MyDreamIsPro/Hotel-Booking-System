import { ButtonBase, styled, Typography } from "@mui/material";
import { searchChatGroup } from "../../../api/chat";

// logic lib
const RootContainer = styled("div")((theme) => ({
  width: "100%",
  backgroundColor: "#FFF",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "10px 16px",
}));

// logic custom
//----------------------------

const SearchingContact = ({ data, setCurrentContact, handleQuitSearching }) => {
  console.log(data);
  const changeCurrentContact = () => {
    searchChatGroup(data._id)
      .then((res) => {
        setCurrentContact({
          id: res.data,
          name: data.full_name,
          profile_image: data.profile_image,
        });
        handleQuitSearching();
      })
      .catch((err) => {
        console.log(err);
        handleQuitSearching();
      });
  };
  return (
    <ButtonBase style={{ width: "100%" }} onClick={changeCurrentContact}>
      <RootContainer>
        <img
          src={data.profile_image}
          alt="contact image"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "gray",
          }}
        />
        <div style={{ width: "80%", marginLeft: 15 }}>
          <Typography variant="body1" textAlign="left" fontWeight="bold">
            {data.full_name}
          </Typography>
        </div>
      </RootContainer>
    </ButtonBase>
  );
};

export default SearchingContact;
