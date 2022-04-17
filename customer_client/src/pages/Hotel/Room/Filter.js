import PropTypes from "prop-types";
// UI lib
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import DateRangePicker from "@mui/lab/DateRangePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// logic lib
import { Formik } from "formik";
import * as Yup from "yup";
import viLocale from "date-fns/locale/vi";
// logic custom
import CustomDateAdapter from "../../../components/CustomDateAdapter";

//#region CSS
const FilterStyle = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const CitySelector = styled(TextField)(({ theme }) => ({
  width: 200,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const DateChooser = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  height: 50,
  width: 100,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
//#endregion

const initialValues = {
  number_people: "",
  date: [new Date(), new Date(Date.now() + 86400000)], // add one day to second element
};

const Filter = () => {
  return (
    <Box
      boxShadow={3}
      style={{
        width: "100%",
        borderRadius: 4,
        padding: 20,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          number_people: Yup.number()
            .min(1, "Chưa nhập số người")
            .required("Chưa nhập số người"),
          date: Yup.array().of(Yup.date().required("Chưa nhập ngày")),
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <FilterStyle
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <CitySelector
                error={Boolean(touched.number_people && errors.number_people)}
                fullWidth
                helperText={touched.number_people && errors.number_people}
                label="Số người"
                margin="normal"
                name="number_people"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.number_people}
                variant="outlined"
                autoComplete="new-password"
              />
              <LocalizationProvider
                locale={viLocale}
                dateAdapter={CustomDateAdapter}
              >
                <DateRangePicker
                  calendars={2}
                  disabled={isSubmitting}
                  inputFormat="dd/MM/yyyy"
                  disablePast
                  name="date"
                  startText="Ngày nhận phòng"
                  endText="Ngày trả phòng"
                  value={values.date}
                  onChange={(newValue) => {
                    setFieldValue("date", [...newValue]);
                  }}
                  renderInput={(startProps, endProps) => (
                    <DateChooser flexDirection="row" alignItems="center">
                      <TextField {...startProps} />
                      <Box sx={{ mx: 1, cursor: "default" }}> đến </Box>
                      <TextField {...endProps} />
                    </DateChooser>
                  )}
                />
              </LocalizationProvider>
              <ButtonStyle
                type="submit"
                variant="contained"
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? (
                  <CircularProgress style={{ color: "#252525" }} />
                ) : (
                  "TÌM KIẾM"
                )}
              </ButtonStyle>
            </FilterStyle>
          </form>
        )}
      </Formik>
    </Box>
  );
};

Filter.propTypes = {
  setIsLoading: PropTypes.func,
};

export default Filter;
