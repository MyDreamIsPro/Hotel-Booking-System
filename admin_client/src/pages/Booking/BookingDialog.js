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
import {
  checkInBooking,
  checkOutBooking,
  cancelBooking,
} from "../../redux/actions/booking";

// ----------------------------
const BookingDialog = ({ dialogContent, open, setOpen, id, setId }) => {
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
      content: dialogContent.successMessage,
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
    switch (dialogContent.type) {
      case "CHECK_IN":
        dispatch(checkInBooking(id, handleSuccess, handleFailure));
        break;
      case "CHECK_OUT":
        dispatch(checkOutBooking(id, handleSuccess, handleFailure));
        break;
      case "CANCEL_BOOKING":
        dispatch(cancelBooking(id, handleSuccess, handleFailure));
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
      <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent.content}
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
          ) : (
            dialogContent.buttonText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;
