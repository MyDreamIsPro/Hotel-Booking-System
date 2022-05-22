import { useEffect, useState, useContext } from "react";
// UI lib
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
// UI custom
import SlideTransition from "../../components/SlideTransition";
import SingleAsyncAutocomplete from "../../components/AsyncAutocomplete/SingleAutocomplete";
import MultipleAsyncAutocomplete from "../../components/AsyncAutocomplete/MultipleAutocomplete";
// logic lib
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// logic custom
import NotificationContext from "../../context/Context";
import { getAllHotelForForm } from "../../api/hotel";
import { getAllUserForForm } from "../../api/user";

//#region CSS
//#endregion

//----------------------------

const BookingForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const booking = useSelector((state) =>
    editedId ? state.booking.find((item) => item._id === editedId) : null
  );

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
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {editedId ? "CẬP NHẬT ĐƠN ĐẶT CHỖ" : "THÊM MỚI ĐƠN ĐẶT CHỖ"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            booking
              ? {
                  hotel: booking.hotel,
                  user: booking.user,
                  room_list: booking.room_list,
                }
              : {
                  hotel: { _id: "", name: "" },
                  user: { _id: "", phone: "", full_name: "" },
                  room_list: [],
                }
          }
          validationSchema={Yup.object().shape({
            hotel: Yup.object()
              .nullable()
              .test("hotel", "Chưa chọn khách sạn", (val) => val?._id),
            user: Yup.object()
              .nullable()
              .test("user", "Chưa chọn khách hàng", (val) => val?._id),
            room_list: Yup.array().min(1, "Chưa chọn phòng"),
          })}
          onSubmit={(values, { setSubmitting }) => {
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={6}>
                  <SingleAsyncAutocomplete
                    touched={touched.hotel}
                    errors={errors.hotel}
                    value={values.hotel}
                    name="hotel"
                    text="Khách sạn"
                    setFieldValue={setFieldValue}
                    fieldToSetValue="hotel"
                    getData={getAllHotelForForm}
                    getOptionLabel={(option) => option.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleAsyncAutocomplete
                    touched={touched.user}
                    errors={errors.user}
                    value={values.user}
                    name="user"
                    text="Khách hàng"
                    setFieldValue={setFieldValue}
                    fieldToSetValue="user"
                    getData={getAllUserForForm}
                    getOptionLabel={(option) =>
                      option.full_name + " - " + option.phone
                    }
                  />
                </Grid>
              </Grid>
              <MultipleAsyncAutocomplete
                touched={touched.room_list}
                errors={errors.room_list}
                value={values.room_list}
                name="room_list"
                text="Danh sách phòng"
                setFieldValue={setFieldValue}
                fieldToSetValue="room_list"
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
                    "CẬP NHẬT"
                  ) : (
                    "TẠO ĐƠN"
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

export default BookingForm;
