import { useState, useRef } from "react";
// UI lib
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

// UI custom
import Iconify from "../../components/Iconify";
import {
  PhoneFormatCustom,
  IdFormatCustom,
} from "../../components/FormattedInput";
// logic lib
import { Formik } from "formik";
import * as Yup from "yup";

// logic custom

//#region CSS
const RootStyle = styled(Stack)(({ theme }) => ({
  minHeight: 250,
  flexDirection: "row",
  [theme.breakpoints.down(900)]: {
    flexDirection: "column",
  },
}));
const ImageSection = styled(Stack)(({ theme }) => ({
  width: "30%",
  boxShadow: "0 0 2pt 0pt gray",
  borderRadius: 4,
  marginRight: 20,
  padding: 20,
  [theme.breakpoints.down(900)]: {
    width: "100%",
    marginBottom: 20,
  },
}));
const InfoSection = styled(Stack)(({ theme }) => ({
  width: "70%",
  boxShadow: "0 0 2pt 0pt gray",
  borderRadius: 4,
  padding: "10px 20px",
  [theme.breakpoints.down(900)]: {
    width: "100%",
  },
}));
//#endregion

//----------------------------
const Info = () => {
  const [show, setShow] = useState(false);
  const inputFile = useRef(null);
  return (
    <RootStyle>
      {/* IMAGE */}
      <ImageSection
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            position: "relative",
            marginBottom: 15,
          }}
          onMouseEnter={(e) => {
            setShow(true);
          }}
          onMouseLeave={(e) => {
            setShow(false);
          }}
        >
          <img
            src="/static/venom.jpg"
            alt="profile"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          {show && (
            <Box
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "50%",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => inputFile.current.click()}
            >
              <Iconify
                icon="mdi:camera-plus"
                style={{
                  color: "#FFF",
                  width: 35,
                  height: 35,
                  marginBottom: 8,
                }}
              />
              <Typography variant="body1" color="#FFF">
                Thay ảnh
              </Typography>
              <input type="file" hidden ref={inputFile} />
            </Box>
          )}
        </Box>
        <Typography variant="body2" color="gray" textAlign="center">
          Nhận ảnh *.jpeg, *.jpg, *.png
        </Typography>
        <Typography variant="body2" color="gray" textAlign="center">
          kích thước tối đa 3.1 MB
        </Typography>
      </ImageSection>
      {/* INFO */}
      <InfoSection>
        <Formik
          initialValues={{
            username: "tuanvq",
            full_name: "Vũ Quốc Tuấn",
            phone: "0904543840",
            identification: "123456789111",
          }}
          validationSchema={Yup.object().shape({
            full_name: Yup.string().max(255).required("Chưa nhập họ và tên"),
            phone: Yup.string()
              .min(10, "Số điện thoại không hợp lệ")
              .max(10, "Số điện thoại không hợp lệ")
              .required("Chưa nhập số điện thoại"),
            username: Yup.string()
              .max(100, "Tài khoản dài tối đa 100 kí tự")
              .required("Chưa nhập tài khoản"),
            identification: Yup.string()
              .max(12, "CMT không hợp lệ")
              .required("Chưa nhập chứng minh thư"),
          })}
          onSubmit={(values, { setSubmitting }) => {}}
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
              <Grid container justifyContent="space-between">
                <Grid item xs={5.6}>
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
                    label="Tài khoản"
                    margin="normal"
                    type="text"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    variant="outlined"
                    autoComplete="new-password"
                    disabled
                  />
                </Grid>
                <Grid item xs={5.6}>
                  <TextField
                    error={Boolean(touched.full_name && errors.full_name)}
                    helperText={touched.full_name && errors.full_name}
                    label="Họ và tên"
                    margin="normal"
                    type="text"
                    name="full_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.full_name}
                    variant="outlined"
                    autoComplete="new-password"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item xs={5.6}>
                  <TextField
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                    label="Số điện thoại"
                    margin="normal"
                    type="tel"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: PhoneFormatCustom,
                    }}
                  />
                </Grid>
                <Grid item xs={5.6}>
                  <TextField
                    fullWidth
                    error={Boolean(
                      touched.identification && errors.identification
                    )}
                    helperText={touched.identification && errors.identification}
                    label="Chứ minh thư"
                    margin="normal"
                    type="text"
                    name="identification"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.identification}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: IdFormatCustom,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ marginTop: 2, height: 50 }}
                type="submit"
                variant="contained"
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? (
                  <CircularProgress style={{ color: "#252525" }} />
                ) : (
                  "LƯU THAY ĐỔI"
                )}
              </Button>
            </form>
          )}
        </Formik>
      </InfoSection>
    </RootStyle>
  );
};

export default Info;
