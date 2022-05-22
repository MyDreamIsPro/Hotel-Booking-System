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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NotificationContext from "../../context/Context";
import { restore } from "../../redux/actions/backup";

// ----------------------------
const RestoreDialog = ({ open, setOpen, id, setId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(NotificationContext);
  const [doing, setDoing] = useState(false);

  const handleClose = (event, reason) => {
    if (doing) return;
    // if (reason && reason == "backdropClick") return;
    setId();
    setOpen(false);
  };

  const handleSuccess = () => {
    context.setNotification({
      type: "success",
      content: "Khôi phục dữ liệu thành công",
    });
    setDoing(false);
    handleClose();
    context.setOpen(true);
  };

  const handleFailure = (needLogin, message) => {
    context.setNotification({
      type: "error",
      content: "Đã có lỗi xảy ra",
    });
    context.setOpen(true);
    setDoing(false);
    if (needLogin) navigate("/login", { replace: true });
    handleClose();
  };

  const handleRestore = () => {
    setDoing(true);
    dispatch(restore(id, handleSuccess, handleFailure));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        KHÔI PHỤC DỮ LIỆU HỆ THỐNG
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Dữ liệu hiện tại của hệ thống sẽ mất và khôi phục dữ liệu sao lưu. Bạn
          chắc chắn muốn tiếp tục chứ ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          style={{ height: 50 }}
        >
          HỦY
        </Button>
        <Button
          onClick={handleRestore}
          color="error"
          variant="contained"
          style={{ marginLeft: 10, height: 50, minWidth: 110 }}
          disabled={doing}
        >
          {doing ? <CircularProgress color="inherit" /> : "KHÔI PHỤC"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestoreDialog;
