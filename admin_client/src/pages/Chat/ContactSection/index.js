import { useEffect, useState } from "react";
// UI lib
import {
  Typography,
  Box,
  styled,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
// UI custom
import Contact from "./Contact";
import SearchingContact from "./SearchingContact";
import CreateGroupDialog from "./CreateGroupDialog";
// logic lib
import { useNavigate } from "react-router-dom";
// logic custom
import { searchContact } from "../../../api/chat";

//#region CSS
const RootContainer = styled(Box)(({ theme }) => ({
  width: "30%",
  height: "100%",
  borderRight: "2px solid #637381",
  position: "relative",
  [theme.breakpoints.down(940)]: {
    display: "none",
  },
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
  margin: "0 9px",
});

//#endregion
//----------------------------

const ContactSection = ({
  user_id,
  currentContactId,
  listContact,
  setSearchParams,
  enqueueSnackbar,
  insideDrawer = false,
}) => {
  const navigate = useNavigate();
  const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchUserResult, setSearchUserResult] = useState([]);
  const [searchGroupResult, setSearchGroupResult] = useState([]);

  const handleOpenSearching = () => setSearching(true);

  const handleQuitSearching = () => {
    setSearchText("");
    setSearching(false);
  };

  useEffect(() => {
    setLoading(true);
    const timeout_id = setTimeout(() => {
      if (searchText.trim() !== "") {
        searchContact({ name: searchText })
          .then((res) => {
            setLoading(false);
            setSearchGroupResult(res.data.groups);
            setSearchUserResult(res.data.users);
          })
          .catch((error) => {
            setLoading(false);
            if (!error.response || error.response.status !== 401) {
              enqueueSnackbar(
                "Đã có lỗi xảy ra, quý khách vui lòng thử lại sau",
                { variant: "error" }
              );
            } else {
              enqueueSnackbar("Phiên đăng nhập hết hạn", { variant: "error" });
              navigate("/login", {
                state: { returnUrl: "/chat" },
              });
            }
          });
      } else {
        setLoading(false);
        setSearchGroupResult([]);
        setSearchUserResult([]);
      }
    }, [500]);
    return () => clearTimeout(timeout_id);
  }, [searchText]);
  return (
    <RootContainer>
      <div style={{ padding: 9, marginBottom: 7 }}>
        <ClickAwayListener onClickAway={handleQuitSearching}>
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
        </ClickAwayListener>
      </div>
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
            <Typography
              textAlign="center"
              variant="body1"
              fontWeight="bold"
              style={{ color: "gray" }}
            >
              Chưa có liên hệ
            </Typography>
          )
        ) : !loading ? (
          searchGroupResult.length > 0 || searchUserResult.length > 0 ? (
            <>
              {searchGroupResult.length > 0 && (
                <Typography fontWeight="bold" style={{ color: "gray" }} mb={1}>
                  Group
                </Typography>
              )}
              {searchGroupResult.map((item, index) => (
                <SearchingContact
                  key={index}
                  data={item}
                  handleQuitSearching={handleQuitSearching}
                  setSearchParams={setSearchParams}
                />
              ))}
              {searchUserResult.length > 0 && (
                <Typography
                  fontWeight="bold"
                  style={{ color: "gray" }}
                  mt={2}
                  mb={1}
                >
                  User
                </Typography>
              )}
              {searchUserResult.map((item, index) => (
                <SearchingContact
                  key={index}
                  data={item}
                  handleQuitSearching={handleQuitSearching}
                  setSearchParams={setSearchParams}
                />
              ))}
            </>
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
      <IconButton
        sx={{
          width: 50,
          height: 50,
          backgroundColor: "primary.main",
          position: "absolute",
          right: 10,
          bottom: 10,
          transition: "transform .15s ease",
          "&:hover": {
            backgroundColor: "primary.light",
          },
          "&:active": {
            transform: "scale(0.9)",
          },
        }}
        onClick={() => setOpenCreateGroupDialog(true)}
      >
        <AddIcon
          style={{
            color: "#FFF",
          }}
        />
      </IconButton>
      <CreateGroupDialog
        open={openCreateGroupDialog}
        setOpen={setOpenCreateGroupDialog}
        setSearchParams={setSearchParams}
        enqueueSnackbar={enqueueSnackbar}
        navigate={navigate}
      />
    </RootContainer>
  );
};

export default ContactSection;
