import { useEffect, useState } from "react";
// UI lib
import {
  Stack,
  Typography,
  Box,
  styled,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// UI custom
import Contact from "./Contact";
import SearchingContact from "./SearchingContact";
import Iconify from "../../../components/Iconify";
// logic lib
import { searchUserForChat } from "../../../api/chat";
// logic custom

//#region CSS
const RootContainer = styled(Box)((theme) => ({
  width: "25%",
  height: "100%",
  borderRight: "2px solid #637381",
}));

const ListContact = styled(Box)({
  overflow: "auto",
  height: "calc(100% - 90px)",
  "&::-webkit-scrollbar": {
    width: "7px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D7DBDF",
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

//#endregion
//----------------------------

const ContactSection = ({
  socket,
  user_id,
  listContact,
  setCurrentContact,
  setSearchParams,
}) => {
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleOpenSearching = () => setSearching(true);
  const handleQuitSearching = () => {
    setSearchText("");
    setSearching(false);
  };
  useEffect(() => {
    setLoading(true);
    const timeout_id = setTimeout(() => {
      if (searchText.trim() !== "") {
        searchUserForChat({ name: searchText })
          .then((res) => {
            setLoading(false);
            setSearchResult(res.data);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      } else {
        setLoading(false);
        setSearchResult([]);
      }
    }, [500]);
    return () => clearTimeout(timeout_id);
  }, [searchText]);
  return (
    <RootContainer>
      <Stack
        p={2}
        style={{ height: 90 }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          onClick={handleQuitSearching}
          style={{ marginRight: 10, height: 50, width: 50 }}
        >
          <Iconify icon="ep:close-bold" />
        </IconButton>
        <TextField
          name="contact"
          placeholder="Tìm kiếm"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={handleOpenSearching}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="medium" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <ListContact
      // style={{ display: searching ? "none" : "block" }}
      >
        {!searching ? (
          listContact.length > 0 ? (
            listContact.map((item, index) => (
              <Contact
                user_id={user_id}
                key={index}
                data={item}
                setCurrentContact={setCurrentContact}
                setSearchParams={setSearchParams}
              />
            ))
          ) : (
            <Typography textAlign="center" variant="body1" fontWeight="bold">
              Chưa có ai
            </Typography>
          )
        ) : !loading ? (
          searchResult.length > 0 ? (
            searchResult.map((item, index) => (
              <SearchingContact
                socket={socket}
                key={index}
                data={item}
                setCurrentContact={setCurrentContact}
                handleQuitSearching={handleQuitSearching}
                setSearchParams={setSearchParams}
              />
            ))
          ) : (
            <Typography textAlign="center" variant="body1" mx={1}>
              Không tìm thấy liên hệ với từ khóa "{searchText}"
            </Typography>
          )
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress style={{ color: "#252525" }} />
          </div>
        )}
      </ListContact>
    </RootContainer>
  );
};

export default ContactSection;