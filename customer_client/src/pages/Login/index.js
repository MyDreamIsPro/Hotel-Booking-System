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

// -------------------------------------------
const RootStyle = styled(Page)({
  paddingTop: 5,
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RootStyle title="Login | TuanVQ">
      <Container maxWidth="sm">
        <Box sx={{ boxShadow: 3, borderRadius: 4, padding: 3 }}>
          <Typography variant="h5">Đăng nhập</Typography>
          <Typography variant="body1">
            Xin vui lòng đăng nhập để truy cập
          </Typography>
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
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required("Chưa nhập tài khoản"),
              password: Yup.string().max(255).required("Chưa nhập mật khẩu"),
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
                <Button
                  sx={{ marginTop: 2, height: 50 }}
                  fullWidth
                  variant="contained"
                >
                  Đăng nhập
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
                    to="/register"
                    underline="hover"
                  >
                    Tạo tài khoản
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

export default Login;
