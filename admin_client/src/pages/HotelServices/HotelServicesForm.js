import { useEffect, useState, useContext } from "react";
// UI lib
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// UI custom
import Iconify from "../../components/Iconify";
import SlideTransition from "../../components/SlideTransition";
// logic lib
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// logic custom
import { iconExists, loadIcon } from "@iconify/react";
import NotificationContext from "../../context/Context";
//#region CSS
//#endregion

//----------------------------

const SERVICE_DATA = [
  { name: "Wi-Fi miễn phí trong tất cả các phòng!", id: 1 },
  { name: "Dọn phòng hằng ngày", id: 2 },
  { name: "Đưa đón sân bay", id: 3 },
  { name: "Quán bar", id: 4 },
  { name: "Gym", id: 5 },
  { name: "Hồ bơi 4 mùa", id: 6 },
  { name: "Sân golf", id: 7 },
];

const HotelServicesForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(NotificationContext);

  const handleCloseDialog = () => {
    if (editedId) setEditedId();
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={SlideTransition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        THÊM MỚI DỊCH VỤ KHÁCH SẠN
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ icon: "", name: "" }}
          validationSchema={Yup.object().shape({
            icon: Yup.string().required("Chưa nhập icon"),
            // .test("icon_exist", "Icon không hợp lệ", function (item) {
            //   return iconExists(item);
            // }),
            name: Yup.string().required("Chưa nhập tên dịch vụ"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
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
          }) => (
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Tên dịch vụ"
                margin="normal"
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
                autoComplete="new-password"
              />
              <TextField
                error={Boolean(touched.icon && errors.icon)}
                fullWidth
                helperText={touched.icon && errors.icon}
                label="Icon"
                margin="normal"
                type="text"
                name="icon"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.icon}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* SUBMIT BUTTON */}
              <Stack
                flexDirection="row"
                justifyContent="flex-end"
                marginTop={3}
              >
                <Button variant="outlined" onClick={handleCloseDialog}>
                  HỦY
                </Button>
                <Button
                  sx={{ marginLeft: 2 }}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting ? true : false}
                >
                  {isSubmitting ? (
                    <CircularProgress style={{ color: "#252525" }} />
                  ) : editedId ? (
                    "SỬA DỊCH VỤ"
                  ) : (
                    "TẠO DỊCH VỤ"
                  )}
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default HotelServicesForm;
