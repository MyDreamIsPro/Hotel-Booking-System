import { useRef, useState } from "react";
import PropTypes from "prop-types";
// UI lib
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DateRangePicker from "@mui/lab/DateRangePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// UI lib
import MenuPopover from "../../components/Popover";
// logic lib
import { Formik } from "formik";
import * as Yup from "yup";
import viLocale from "date-fns/locale/vi";
import { useDispatch } from "react-redux";
// logic custom
import { getHotelByFilter } from "../../redux/actions/hotelList";
import CustomDateAdapter from "../../components/CustomDateAdapter";
import { city } from "../../__MOCK__";

//#region CSS
const FilterStyle = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down(1180)]: {
    flexDirection: "column",
  },
}));

const CitySelector = styled(Autocomplete)(({ theme }) => ({
  width: 250,
  [theme.breakpoints.down(1180)]: {
    width: "100%",
  },
}));

const DateChooser = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down(1180)]: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
}));

const VistorChooser = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down(1180)]: {
    marginBottom: 20,
    width: "100%",
  },
}));
const CountButton = styled(IconButton)(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.primary,
  width: 30,
  height: 30,
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  height: 50,
  width: 100,
  [theme.breakpoints.down(1180)]: {
    width: "100%",
  },
}));

//#endregion

const initialValues = {
  fake: 0,
  date: [new Date(), new Date(Date.now() + 86400000)], // add one day to second element
  adult: 1,
  kid: 0,
  baby: 0,
};

const Filter = ({ setResult }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
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
            fake: Yup.number()
              .min(1, "Chọn tỉnh / thành phố")
              .max(64, "Chọn tỉnh / thành phố"),
            date: Yup.array().of(Yup.date().required("Chưa nhập ngày")),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setResult({ loading: true, num: -1 });
            dispatch(
              getHotelByFilter(
                values,
                (numResult) => {
                  setSubmitting(false);
                  setResult({ loading: false, num: numResult });
                },
                () => {
                  setSubmitting(false);
                  setResult({ loading: false, num: 0 });
                }
              )
            );
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
                  id="fake"
                  name="fake"
                  value={city[values.fake]}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => {
                    setFieldValue("fake", value !== null ? value.fake : 0);
                  }}
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

                {/* NUMBER VISITOR */}
                <VistorChooser
                  ref={anchorRef}
                  value={`${values.adult} Người lớn - ${values.kid} Trẻ em - ${values.baby} Em bé`}
                  name="people"
                  label="Số lượng khách"
                  focused={open}
                  type="text"
                  variant="outlined"
                  onClick={() => setOpen(true)}
                />
                <MenuPopover
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                  anchorEl={anchorRef.current}
                >
                  <Box style={{ padding: 10, width: 400 }}>
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      style={{
                        borderBottom: "1px solid gray",
                        paddingBottom: 10,
                      }}
                    >
                      {/* ADULT */}
                      <Box style={{ flex: 1 }}>
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <CountButton
                            color="primary"
                            onClick={() => {
                              if (values.adult > 1)
                                setFieldValue("adult", values.adult - 1);
                            }}
                          >
                            <RemoveIcon />
                          </CountButton>
                          <Typography>{values.adult}</Typography>
                          <CountButton
                            color="primary"
                            onClick={() =>
                              setFieldValue("adult", values.adult + 1)
                            }
                          >
                            <AddIcon />
                          </CountButton>
                        </Stack>
                        <Typography textAlign="center" variant="body1">
                          Người lớn
                        </Typography>
                      </Box>
                      {/* KID */}
                      <Box
                        style={{
                          flex: 1,
                          borderRight: "1px solid gray",
                          borderLeft: "1px solid gray",
                          marginLeft: 20,
                          marginRight: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
                        }}
                      >
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <CountButton
                            color="primary"
                            onClick={() => {
                              if (values.kid > 0)
                                setFieldValue("kid", values.kid - 1);
                            }}
                          >
                            <RemoveIcon />
                          </CountButton>
                          <Typography>{values.kid}</Typography>
                          <CountButton
                            color="primary"
                            onClick={() => setFieldValue("kid", values.kid + 1)}
                          >
                            <AddIcon />
                          </CountButton>
                        </Stack>
                        <Typography textAlign="center" variant="body1">
                          Trẻ em
                        </Typography>
                      </Box>
                      {/* BABY */}
                      <Box style={{ flex: 1 }}>
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <CountButton
                            color="primary"
                            onClick={() => {
                              if (values.baby > 0)
                                setFieldValue("baby", values.baby - 1);
                            }}
                          >
                            <RemoveIcon />
                          </CountButton>
                          <Typography>{values.baby}</Typography>
                          <CountButton
                            color="primary"
                            onClick={() =>
                              setFieldValue("baby", values.baby + 1)
                            }
                          >
                            <AddIcon />
                          </CountButton>
                        </Stack>
                        <Typography textAlign="center" variant="body1">
                          Em bé
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="body2" color="gray" marginTop={1}>
                      Em bé : 0 tuổi - 2 tuổi / Trẻ em : 2 tuổi - 4 tuổi
                    </Typography>
                  </Box>
                </MenuPopover>
                {/* SUBMIT BUTTON */}
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
