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
import CreateIcon from "@mui/icons-material/Create";
// UI custom
import Contact from "./Contact";
import SearchingContact from "./SearchingContact";
import Iconify from "../../../components/Iconify";
// logic lib
import { searchUserForChat } from "../../../api/chat";
// logic custom

//#region CSS
const RootContainer = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "100%",
  borderRight: "2px solid #637381",
  position: "relative",
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
  margin: "0 5px",
});

//#endregion
//----------------------------

const ContactSection = ({
  user_id,
  currentContactId,
  listContact,
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
          style={{
            marginRight: 10,
            height: 50,
            width: 50,
          }}
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
      <ListContact>
        {!searching ? (
          listContact.length > 0 ? (
            listContact.map((item, index) => (
              <Contact
                user_id={user_id}
                key={index}
                data={item}
                setSearchParams={setSearchParams}
                currentContactId={currentContactId}
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
                key={index}
                data={item}
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
      {/* <IconButton
        sx={{
          width: 50,
          height: 50,
          backgroundColor: "primary.main",
          position: "absolute",
          right: 10,
          bottom: 10,
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        <CreateIcon
          style={{
            color: "#FFF",
          }}
        />
      </IconButton> */}
    </RootContainer>
  );
};

export default ContactSection;
