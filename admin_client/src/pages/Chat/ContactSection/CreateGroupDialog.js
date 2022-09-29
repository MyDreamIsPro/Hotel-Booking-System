import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SlideTransition from "../../../components/SlideTransition";
import { searchUserForChat, createGroupChat } from "../../../api/chat";

const getLastName = (full_name) => {
  const arr = full_name.split(" ");
  return arr[arr.length - 1].trim();
};

const ChosenItem = ({ data, setChosenList, setSearchResult }) => {
  const handleRemoveItem = () => {
    setChosenList((prevList) =>
      prevList.filter((item) => item._id !== data._id)
    );
    setSearchResult((prevList) => [data, ...prevList]);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content",
        margin: 5,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          position: "relative",
        }}
      >
        <img
          src={data.profile_image}
          alt="profile"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: 20,
          }}
        />
        <IconButton
          style={{
            position: "absolute",
            width: 5,
            height: 5,
            top: 0,
            right: 0,
            backgroundColor: "#252525",
          }}
          onClick={handleRemoveItem}
        >
          <CloseIcon style={{ color: "#FFF", width: 10, height: 10 }} />
        </IconButton>
      </div>
      <Typography fontWeight="bold">{getLastName(data.full_name)}</Typography>
    </div>
  );
};

const SearchItem = ({ data, setChosenList, setSearchResult }) => {
  const handleChooseItem = () => {
    setChosenList((prevList) => [...prevList, data]);
    setSearchResult((prevList) =>
      prevList.filter((item) => item._id !== data._id)
    );
  };
  return (
    <ButtonBase
      style={{
        height: 50,
        width: "100%",
        borderRadius: 8,
        overflow: "hidden",
        padding: 5,
      }}
      onClick={handleChooseItem}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        style={{ height: 40, width: "100%" }}
      >
        <img
          src={data.profile_image}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            marginRight: 10,
            objectFit: "cover",
          }}
        />
        <Typography fontWeight="bold">{data.full_name}</Typography>
      </Stack>
    </ButtonBase>
  );
};

const CreateGroupDialog = ({
  open,
  setOpen,
  setSearchParams,
  enqueueSnackbar,
  navigate,
}) => {
  const inputFile = useRef(null);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [chosenList, setChosenList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState();

  const handleClose = () => {
    setLoading(false);
    setName("");
    setSearchText("");
    setChosenList([]);
    setSearchResult([]);
    setAvatar();
    setPreview();
    setOpen(false);
  };

  const handleChangeAvatar = (image) => {
    setAvatar(image);
    setPreview(URL.createObjectURL(image));
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
            if (!err.response || err.response.status !== 401) {
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
        setSearchResult([]);
      }
    }, [500]);

    return () => clearTimeout(timeout_id);
  }, [searchText]);

  useEffect(() => {
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
      TransitionComponent={SlideTransition}
    >
      <DialogTitle style={{ textAlign: "center" }}>
        THÊM MỚI GROUP CHAT
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            margin: "0 auto",
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: "#F4F4F4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color .3s ease",
            position: "relative",
            "&:hover": {
              backgroundColor: "#d9d9d9",
            },
          }}
          onClick={() => inputFile.current.click()}
        >
          <input
            type="file"
            hidden
            accept="image/*"
            ref={inputFile}
            onChange={(e) => handleChangeAvatar(e.target.files[0])}
          />
          <CameraAltIcon />
          {preview && (
            <img
              src={preview}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
        </Box>
        <TextField
          fullWidth
          label="Tên"
          margin="normal"
          type="text"
          name="name"
          variant="outlined"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Tìm kiếm"
          margin="normal"
          type="text"
          name="search"
          variant="outlined"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div style={{ display: "flex" }}>
          {chosenList.map((item, index) => (
            <ChosenItem
              key={index}
              data={item}
              setSearchResult={setSearchResult}
              setChosenList={setChosenList}
            />
          ))}
        </div>
        <div>
          {!loading ? (
            searchResult.map((item, index) => {
              if (index === 0) {
                return (
                  <>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      style={{ color: "gray" }}
                    >
                      Gợi ý
                    </Typography>
                    <SearchItem
                      key={index}
                      data={item}
                      setSearchResult={setSearchResult}
                      setChosenList={setChosenList}
                    />
                  </>
                );
              } else
                return (
                  <SearchItem
                    key={index}
                    data={item}
                    setSearchResult={setSearchResult}
                    setChosenList={setChosenList}
                  />
                );
            })
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress style={{ color: "#252525" }} />
            </div>
          )}
        </div>
        <Stack
          style={{ marginTop: 10 }}
          flexDirection="row"
          justifyContent="flex-end"
        >
          <Button variant="outlined" onClick={handleClose}>
            HỦY
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={() => {
              const formData = new FormData();
              formData.append("name", name);
              formData.append("members", JSON.stringify(chosenList));
              formData.append("profile_image", avatar);
              createGroupChat(formData)
                .then((res) => {
                  handleClose();
                  setSearchParams({ t: res.data });
                })
                .catch((err) => console.log(err));
            }}
          >
            THÊM
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
