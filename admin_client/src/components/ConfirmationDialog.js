import { useContext } from "react";

import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { deleteHotel } from "../redux/actions/hotel";
import NotificationContext from "../context/Context";

const ConfirmationDialog = ({
  content,
  title,
  open,
  setOpen,
  id,
  setId,
  deleteType,
}) => {
  const dispatch = useDispatch();
  const context = useContext(NotificationContext);
  const handleClose = () => {
    setId();
    setOpen(false);
  };

  const handleDelete = () => {
    switch (deleteType) {
      case "HOTEL":
        dispatch(
          deleteHotel(
            id,
            () => {
              context.setNotification({
                type: "success",
                content: "Xóa thành công",
              });
              context.setOpen(true);
              handleClose();
            },
            () => {
              context.setNotification({
                type: "error",
                content: "Đã có lỗi xảy ra",
              });
              context.setOpen(true);
              handleClose();
            }
          )
        );
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          HỦY
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          XÓA
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
