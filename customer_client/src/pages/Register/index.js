import { useState } from "react";
// UI lib
import {
  Button,
  styled,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import Iconify from "../../components/Iconify";

// Logic lib
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

// UI custom
import Page from "../../components/Page";
import { PhoneFormatCustom } from "../../components/FormattedInput";

// Logic custom
import { INTEGER } from "../../constants";

// -------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: INTEGER.APP_BAR_MOBILE + 24,
  [theme.breakpoints.up("lg")]: {
    paddingTop: INTEGER.APP_BAR_DESKTOP + 24,
  },
}));

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <RootStyle title="Register | TuanVQ">
      <Container maxWidth="sm">
        <Box sx={{ boxShadow: 3, borderRadius: 4, padding: 3 }}>
          <Typography variant="h5">Đăng ký</Typography>
          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:google-fill"
                color="#DF3E30"
                sx={{ height: 20, width: 20 }}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:facebook-fill"
                color="#1877F2"
                sx={{ height: 20, width: 20 }}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:twitter-fill"
                color="#1C9CEA"
                sx={{ height: 20, width: 20 }}
              />
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Hoặc tiếp tục với
            </Typography>
          </Divider>

          <Formik
            initialValues={{
              full_name: "",
              phone: "",
              username: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={Yup.object().shape({
              full_name: Yup.string().max(255).required("Chưa nhập họ và tên"),
              phone: Yup.string()
                .min(10, "Số điện thoại không hợp lệ")
                .max(10, "Số điện thoại không hợp lệ")
                .required("Chưa nhập số điện thoại"),
              username: Yup.string().max(255).required("Chưa nhập tài khoản"),
              password: Yup.string().max(255).required("Chưa nhập mật khẩu"),
              confirm_password: Yup.string()
                .max(255)
                .required("Chưa nhập mật khẩu"),
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
                  fullWidth
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
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
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
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Mật khẩu"
                  margin="normal"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  error={Boolean(
                    touched.confirm_password && errors.confirm_password
                  )}
                  fullWidth
                  helperText={
                    touched.confirm_password && errors.confirm_password
                  }
                  label="Xác nhận mật khẩu"
                  margin="normal"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm_password}
                  variant="outlined"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowConfirmPassword}
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showConfirmPassword
                                ? "eva:eye-fill"
                                : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{ marginTop: 2, height: 50 }}
                  fullWidth
                  variant="contained"
                >
                  Đăng ký
                </Button>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ my: 2 }}
                >
                  <Link
                    component={RouterLink}
                    variant="body1"
                    to="/login"
                    underline="hover"
                  >
                    Đã có tài khoản?
                  </Link>

                  <Link
                    component={RouterLink}
                    variant="body1"
                    to="#"
                    underline="hover"
                  >
                    Quên mật khẩu?
                  </Link>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default Register;
