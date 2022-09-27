import { useState, useEffect } from "react";
import {
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
import SlideTransition from "../../../components/SlideTransition";
import { searchUserForChat } from "../../../api/chat";

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

const CreateGroupDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [chosenList, setChosenList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleClose = () => {
    setLoading(false);
    setName("");
    setSearchText("");
    setChosenList([]);
    setSearchResult([]);
    setOpen(false);
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
          <Button variant="contained" style={{ marginLeft: 10 }}>
            THÊM
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
