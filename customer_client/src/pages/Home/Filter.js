// UI lib
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";
// Logic lib
import { Formik } from "formik";
import * as Yup from "yup";
import Iconify from "../../components/Iconify";

const RootStyle = styled(Box)(({ theme }) => ({
  marginTop: 40,
  width: "100%",
  height: 350,
  backgroundColor: "rgba(255,255,255, 1)",
  borderRadius: 15,
  paddingLeft: 30,
  paddingRight: 30,
  [theme.breakpoints.only("md")]: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 100,
    paddingRight: 100,
  },
}));

const Filter = () => {
  return (
    <RootStyle boxShadow={5}>
      <Formik
        initialValues={{
          address: "",
        }}
        validationSchema={Yup.object().shape({
          address: Yup.string().max(255).required("Chưa nhập địa điểm"),
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
              sx={{ backgroundColor: "#FFF", fontSize: 30 }}
              //   error={Boolean(touched.address && errors.address)}
              fullWidth
              //   helperText={touched.address && errors.address}
              label="Địa điểm"
              margin="normal"
              type="text"
              name="address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
              variant="outlined"
              autoComplete="off"
            />
          </form>
        )}
      </Formik>
    </RootStyle>
  );
};

export default Filter;
