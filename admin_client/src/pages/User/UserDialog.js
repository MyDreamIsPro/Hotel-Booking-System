import { useContext, useState } from "react";
// UI
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  CircularProgress,
} from "@mui/material";
// Logic
import NotificationContext from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { banAccount, activeAccount } from "../../redux/actions/account";

// ----------------------------
const UserDialog = ({ typeDialog, open, setOpen, id, setId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const [doing, setDoing] = useState(false);

  const handleClose = () => {
    if (doing) return;
    setId();
    setOpen(false);
  };

  const handleSuccess = () => {
    context.setNotification({
      type: "success",
      content:
        typeDialog === "BAN"
          ? "Khóa tài khoản thành công"
          : "Mở khóa tài khoản thành công",
    });
    context.setOpen(true);
    setDoing(false);
    handleClose();
  };

  const handleFailure = (needLogin, message) => {
    context.setNotification({
      type: "error",
      content: message,
    });
    context.setOpen(true);
    setDoing(false);
    if (needLogin) navigate("/login", { replace: true });
    handleClose();
  };

  const handleDelete = () => {
    setDoing(true);
    switch (typeDialog) {
      case "BAN":
        dispatch(banAccount(id, handleSuccess, handleFailure));
        break;
      case "ACTIVE":
        dispatch(activeAccount(id, handleSuccess, handleFailure));
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {typeDialog === "BAN" ? "KHÓA TÀI KHOẢN" : "MỞ KHÓA TÀI KHOẢN"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {typeDialog === "BAN"
            ? "Bạn chắc chắn muốn khóa tài khoản này ?"
            : "Bạn chắc chắn muốn mở khóa tài khoản này ?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          style={{ height: 50 }}
        >
          ĐÓNG
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          style={{ marginLeft: 10, height: 50, minWidth: 80 }}
          disabled={doing}
        >
          {doing ? (
            <CircularProgress color="inherit" />
          ) : typeDialog === "BAN" ? (
            "KHÓA"
          ) : (
            "MỞ KHÓA"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
