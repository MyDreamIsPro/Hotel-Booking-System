import { useContext } from "react";
// UI
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
// Logic
import { useDispatch } from "react-redux";
import { deleteRoomService } from "../redux/actions/room_service";
import { deleteHotel } from "../redux/actions/hotel";
import { deleteRoomType } from "../redux/actions/room_type";
import NotificationContext from "../context/Context";
import { deleteRoom } from "../redux/actions/room";

// ----------------------------
const ConfirmationDialog = ({
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

  const handleSuccess = () => {
    context.setNotification({
      type: "success",
      content: "Xóa thành công",
    });
    context.setOpen(true);
    handleClose();
  };

  const handleFailure = () => {
    context.setNotification({
      type: "error",
      content: "Đã có lỗi xảy ra",
    });
    context.setOpen(true);
    handleClose();
  };

  const handleDelete = () => {
    switch (deleteType) {
      case "HOTEL":
        dispatch(deleteHotel(id, handleSuccess, handleFailure));
        break;
      case "ROOM":
        dispatch(deleteRoom(id, handleSuccess, handleFailure));
        break;
      case "ROOM_SERVICE":
        dispatch(deleteRoomService(id, handleSuccess, handleFailure));
        break;
      case "ROOM_TYPE":
        dispatch(deleteRoomType(id, handleSuccess, handleFailure));
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
          Hành động này sẽ không thể khôi phục. Bạn chắc chắn muốn xóa chứ ?
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
