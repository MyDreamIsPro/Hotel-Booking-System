// UI lib
import { Box, Stack, styled, TextField, Typography } from "@mui/material";
// UI custom
import Iconify from "../../components/Iconify";
import {
  PhoneFormatCustom,
  IdFormatCustom,
} from "../../components/FormattedInput";
// logic lib
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// logic custom
import { logout } from "../../redux/actions/user";
//#region CSS
const LogoutButton = styled("span")(({ theme }) => ({
  textDecoration: "underline",
  cursor: "pointer",
  color: theme.palette.primary.main,
}));
//#endregion

//----------------------------
// style={{ boxShadow: "0 0 3pt 0pt gray", marginBottom: 20 }}
const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box>
      {/* IS ANONYMOUS ? */}
      <Stack
        flexDirection="row"
        alignItems="center"
        style={{ boxShadow: "0 0 3pt 0pt gray", marginBottom: 20 }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "primary.main",
            height: 50,
            width: 50,
            marginRight: 2,
          }}
        >
          <Iconify
            icon="gridicons:user-circle"
            style={{ width: 30, height: 30, color: "#FFF" }}
          />
        </Stack>
        <Typography variant="body1">
          Xin chào Quốc Tuấn Vũ! (không phải là Quốc Tuấn Vũ?{" "}
          <LogoutButton
            onClick={() =>
              dispatch(
                logout(
                  () => navigate("/", { replace: true }),
                  () => {}
                )
              )
            }
          >
            Thoát
          </LogoutButton>{" "}
          )
        </Typography>
      </Stack>
      {/* FORM */}
      <Box
        style={{
          boxShadow: "0 0 3pt 0pt gray",
          marginBottom: 20,
          padding: 20,
        }}
      >
        <Typography variant="h6" fontWeight="bold" style={{ marginBottom: 15 }}>
          Thông tin liên hệ
        </Typography>
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
              <TextField
                fullWidth
                error={Boolean(touched.identification && errors.identification)}
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
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default UserInfo;
