import PropTypes from "prop-types";
// UI lib
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
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
import CustomDateAdapter from "./CustomDateAdapter";
import { city } from "../../__MOCK__/city";

//#region CSS
const FilterStyle = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const CitySelector = styled(Autocomplete)(({ theme }) => ({
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
  city_id: -1,
  date: [new Date(), new Date(Date.now() + 86400000)], // add one day to second element
};

const Filter = ({ setIsLoading }) => {
  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: "#f4f4f4",
        padding: 20,
      }}
    >
      <Container
        maxWidth="lg"
        style={{
          backgroundColor: "#FFF",
          paddingTop: 20,
          paddingBottom: 20,
          boxShadow: "0 0 5px 0px gray",
          borderRadius: 5,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            city_id: Yup.number()
              .min(1, "Chọn tỉnh / thành phố")
              .max(64, "Chọn tỉnh / thành phố"),
            date: Yup.array().of(Yup.date().required("Chưa nhập ngày")),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setSubmitting(false);
            }, 5000);
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
              <FilterStyle
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CitySelector
                  disabled={isSubmitting}
                  id="city_id"
                  name="city_id"
                  getOptionLabel={(option) => option.name}
                  disablePortal
                  onChange={(e, value) => {
                    setFieldValue(
                      "city_id",
                      value !== null ? value.id : initialValues.city_id
                    );
                  }}
                  options={city}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(touched.city_id && errors.city_id)}
                      helperText={touched.city_id && errors.city_id}
                      name="city_id"
                      label="Tỉnh / Thành phố"
                    />
                  )}
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
      </Container>
    </Box>
  );
};

Filter.propTypes = {
  setIsLoading: PropTypes.func,
};

export default Filter;
