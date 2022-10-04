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

const SearchingContact = ({ data, setSearchParams }) => {
  const changeCurrentContact = () => {
    if (data.name) {
      setSearchParams({ t: data._id });
    } else {
      searchChatGroup(data._id)
        .then((res) => {
          setSearchParams({ t: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <ButtonBase
      style={{ width: "100%", borderRadius: 5 }}
      onClick={changeCurrentContact}
    >
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
            {data.name ? data.name : data.full_name}
          </Typography>
        </div>
      </RootContainer>
    </ButtonBase>
  );
};

export default SearchingContact;
