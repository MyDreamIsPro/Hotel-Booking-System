// UI lib
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Stack,
  TextField,
  styled,
  Switch,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
// UI custom
import SlideTransition from "../../components/SlideTransition";
import CustomDateAdapter from "../../components/CustomDateAdapter";
// logic lib
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// logic custom
import { createEvent, updateEvent } from "../../redux/actions/event";
//#region CSS
const ColorBlock = styled("div")({
  width: 26,
  height: 26,
  borderRadius: 13,
  marginRight: 10,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform .2s ease",
  "&:hover": {
    transform: "scale(1.2)",
  },
});
//#endregion

//----------------------------
const COLORS = ["#1890FF", "#00AB55", "#FFC107", "#FF4842"];
const ScheduleForm = ({
  open,
  setOpen,
  editedId,
  setEditedId,
  startDate,
  endDate,
  setOpenDeleteDialog,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const event = useSelector((state) =>
    editedId
      ? state.event.find((item) => item.extendedProps._id === editedId)
      : null
  );

  const handleCloseDialog = () => {
    setEditedId();
    setOpen(false);
  };

  const showNotification = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={SlideTransition}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">
        {editedId ? "CẬP NHẬT SỰ KIỆN" : "THÊM MỚI SỰ KIỆN"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            event
              ? {
                  title: event.title,
                  description: event.extendedProps.description,
                  is_all_day: event.allDay,
                  start_date: event.start,
                  end_date: event.end,
                  color: event.backgroundColor,
                }
              : {
                  title: "",
                  description: "",
                  is_all_day: false,
                  start_date: startDate,
                  end_date: endDate,
                  color: COLORS[0],
                }
          }
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Chưa nhập tiêu đề"),
            // description: Yup.string().required("Chưa nhập mô tả"),
            end_date: Yup.date().test(
              "end_date_constraint",
              "Ngày kết thúc > ngày bắt đầu",
              function (item) {
                // console.log(item);
                // console.log(new Date(this.parent.start_date));
                return item > new Date(this.parent.start_date);
              }
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            if (editedId) {
              dispatch(
                updateEvent(
                  editedId,
                  values,
                  () => {
                    showNotification("Cập nhật sự kiện thành công", "success");
                    setSubmitting(false);
                    handleCloseDialog();
                  },
                  (needLogin, message) => {
                    showNotification(message, "error");
                    setSubmitting(false);
                    if (needLogin) navigate("/login", { replace: true });
                  }
                )
              );
            } else {
              dispatch(
                createEvent(
                  values,
                  () => {
                    showNotification("Thêm sự kiện thành công", "success");
                    setSubmitting(false);
                    handleCloseDialog();
                  },
                  (needLogin, message) => {
                    showNotification(message, "error");
                    setSubmitting(false);
                    if (needLogin) navigate("/login", { replace: true });
                  }
                )
              );
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* TITLE */}
              <TextField
                error={Boolean(touched.title && errors.title)}
                fullWidth
                helperText={touched.title && errors.title}
                label="Tiêu đề"
                margin="normal"
                type="text"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* DESCRIPTION */}
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Mô tả"
                multiline
                minRows={4}
                maxRows={4}
                margin="normal"
                type="text"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* ALL-DAY OPTION */}
              <Stack flexDirection="row" alignItems="center" my={0.5}>
                <Switch
                  checked={values.is_all_day}
                  onChange={(e) =>
                    setFieldValue("is_all_day", e.target.checked)
                  }
                />
                <Typography>Sự kiện cả ngày</Typography>
              </Stack>
              <LocalizationProvider dateAdapter={CustomDateAdapter}>
                {/* START DATE */}
                <MobileDateTimePicker
                  label="Ngày bắt đầu"
                  inputFormat="dd/MM/yyyy HH:MM"
                  value={values.start_date}
                  onChange={(date) => {
                    setFieldValue("start_date", date);
                  }}
                  renderInput={(params) => (
                    <TextField margin="normal" fullWidth {...params} />
                  )}
                />
                {/* END DATE */}
                <MobileDateTimePicker
                  label="Ngày kết thúc"
                  inputFormat="dd/MM/yyyy HH:MM"
                  value={values.end_date}
                  onChange={(date) => {
                    setFieldValue("end_date", date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      {...params}
                      // error and helper text attributes must be putted below {...params} to work
                      error={Boolean(touched.end_date && errors.end_date)}
                      helperText={touched.end_date && errors.end_date}
                    />
                  )}
                />
              </LocalizationProvider>
              {/* COLOR CHOOSER */}
              <Stack flexDirection="row" mt={1}>
                {COLORS.map((item) => (
                  <ColorBlock
                    onClick={() => setFieldValue("color", item)}
                    key={item}
                    style={{ backgroundColor: item }}
                  >
                    <CheckIcon
                      style={{
                        color: "#FFF",
                        fontSize: 19,
                        opacity: values.color === item ? 1 : 0,
                        transition: "opacity .2s ease",
                      }}
                    />
                  </ColorBlock>
                ))}
                <ColorBlock />
              </Stack>
              {/* SUBMIT BUTTON */}
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginTop={3}
              >
                {editedId ? (
                  <Tooltip title="Xóa sự kiện" placement="right">
                    <IconButton
                      size="medium"
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      <DeleteIcon color="error" fontSize="large" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <div></div>
                )}
                <div>
                  <Button variant="outlined" onClick={handleCloseDialog}>
                    HỦY
                  </Button>
                  <Button
                    sx={{ marginLeft: 2 }}
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress style={{ color: "#252525" }} />
                    ) : editedId ? (
                      "CẬP NHẬT"
                    ) : (
                      "TẠO SỰ KIỆN"
                    )}
                  </Button>
                </div>
              </Stack>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleForm;
