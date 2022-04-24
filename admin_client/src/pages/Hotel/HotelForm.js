import { useEffect, useState } from "react";
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
  DialogActions,
} from "@mui/material";
// UI custom
import Iconify from "../../components/Iconify";
import SlideTransition from "../../components/SlideTransition";
// logic lib
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
// logic custom
import {
  TelephoneFormatCustom,
  PriceFormatCustom,
} from "../../components/FormattedInput";
import ImageUploader from "../../components/ImageUploader";
import { city } from "../../__MOCK__";

//#region CSS
const ImagePreview = styled(Box)({
  marginTop: 20,
  marginBottom: 10,
});

const DeleteImageButton = styled(IconButton)({
  width: 30,
  height: 30,
  position: "absolute",
  borderRadius: 15,
  top: 5,
  right: 5,
  backgroundColor: "rgba(255,255,255,.5)",
  transition: "background-color .3s ease",
  "&:hover": {
    backgroundColor: "#FFF",
  },
});
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

const HotelForm = ({ openDialog, setOpenDialog, hotelId, setHotelId }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    // console.log("useEffect", files);
    return files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (hotelId) setHotelId(null);
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={SlideTransition}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Thêm mới khách sạn</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            address: "",
            phone: "",
            email: "",
            size: "",
            numberOfRooms: "",
            fake: -1,
            description: "",
            services: [],
            images: [],
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Chưa nhập tên khách sạn"),
            address: Yup.string().required("Chưa nhập địa chỉ"),
            phone: Yup.string().required("Chưa nhập số điện thoại"),
            email: Yup.string().required("Chưa nhập email"),
            size: Yup.number().required("Chưa nhập diện tích"),
            numberOfRooms: Yup.number().required("Chưa nhập số phòng"),
            fake: Yup.number()
              .min(1, "Chọn tỉnh / thành phố")
              .max(64, "Chọn tỉnh / thành phố"),
            description: Yup.string().required("Chưa nhập mô tả"),
            services: Yup.array().min(1, "Chưa chọn dịch vụ"),
            images: Yup.array().min(1, "Chưa nhập ảnh"),
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Tên khách sạn"
                margin="normal"
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* ADDRESS */}
              <TextField
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label="Địa chỉ"
                margin="normal"
                type="text"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* SIZE - NUM ROOMS - CITY */}
              <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="fake"
                    name="fake"
                    // value={{ name: "An Giang", fake: 1 }}
                    isOptionEqualToValue={(option, value) =>
                      option.fake === value.fake
                    }
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                      setFieldValue("fake", value !== null ? value.fake : -1);
                    }}
                    // isOptionEqualToValue={(option, value) =>
                    //   option.fake === value.fake
                    // }
                    options={city}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={Boolean(touched.fake && errors.fake)}
                        helperText={touched.fake && errors.fake}
                        name="fake"
                        margin="normal"
                        label="Tỉnh / Thành phố"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    error={Boolean(touched.size && errors.size)}
                    fullWidth
                    helperText={touched.size && errors.size}
                    label="Diện tích"
                    margin="normal"
                    type="text"
                    name="size"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.size}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: PriceFormatCustom,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography>
                            m<sup>2</sup>
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    error={Boolean(
                      touched.numberOfRooms && errors.numberOfRooms
                    )}
                    fullWidth
                    helperText={touched.numberOfRooms && errors.numberOfRooms}
                    label="Số phòng"
                    margin="normal"
                    type="text"
                    name="numberOfRooms"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numberOfRooms}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: PriceFormatCustom,
                    }}
                  />
                </Grid>
              </Grid>
              {/* PHONE - EMAIL */}
              <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Số điện thoại"
                    margin="normal"
                    type="text"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: TelephoneFormatCustom,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    type="text"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              {/* DESCRIPTION */}
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Mô tả"
                multiline
                minRows={4}
                maxRows={Infinity}
                margin="normal"
                type="text"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* SERVICES */}
              <Autocomplete
                multiple
                name="services"
                id="checkboxes-tags-demo"
                options={SERVICE_DATA}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <Box {...props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option.name}
                  </Box>
                )}
                onChange={(e, value) => {
                  setFieldValue("services", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(touched.services && errors.services)}
                    helperText={touched.services && errors.services}
                    margin="normal"
                    label="Dịch vụ"
                    placeholder="Dịch vụ"
                  />
                )}
              />
              {/* IMAGES */}
              <Typography color="#637381" marginTop={3} fontWeight="bold">
                Ảnh mô tả
              </Typography>
              <ImageUploader
                files={files}
                setFiles={setFiles}
                setFieldValue={setFieldValue}
                hasError={errors.images && touched.images}
              />
              <ErrorMessage name="images">
                {(msg) => (
                  <Typography
                    variant="body2"
                    marginLeft={1.5}
                    marginTop={0.5}
                    color="error"
                  >
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              {files.length > 0 ? (
                <ImagePreview>
                  <Grid container rowSpacing={1} columnSpacing={2}>
                    {files.map((item, index) => (
                      <Grid key={index} item lg={1.5}>
                        <Box
                          style={{
                            width: "100%",
                            height: 90,
                            borderRadius: 8,
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <DeleteImageButton
                            onClick={() => {
                              setFiles(
                                files.filter(
                                  (image) => image.path !== item.path
                                )
                              );
                              setFieldValue(
                                "images",
                                values.images.filter(
                                  (image) => image.path !== item.path
                                )
                              );
                            }}
                          >
                            <Iconify icon="akar-icons:minus" />
                          </DeleteImageButton>
                          <img
                            src={URL.createObjectURL(item)}
                            alt="preview"
                            style={{
                              width: "100%",
                              height: 90,
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Stack
                    flexDirection="row"
                    justifyContent="flex-end"
                    marginTop={2}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setFiles([]);
                        setFieldValue("images", []);
                      }}
                    >
                      XÓA HẾT
                    </Button>
                  </Stack>
                </ImagePreview>
              ) : null}
              {/* SUBMIT BUTTON */}
              <Stack
                flexDirection="row"
                justifyContent="flex-end"
                marginTop={3}
              >
                <Button
                  variant="outlined"
                  onClick={handleCloseDialog}
                  sx={{ height: 50 }}
                >
                  HỦY
                </Button>
                <Button
                  sx={{ height: 50, marginLeft: 2 }}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting ? true : false}
                >
                  {isSubmitting ? (
                    <CircularProgress style={{ color: "#252525" }} />
                  ) : (
                    "TẠO KHÁCH SẠN"
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

export default HotelForm;
