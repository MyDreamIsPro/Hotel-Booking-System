import { useState } from "react";
import Page from "../../components/Page";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import viLocale from "date-fns/locale/vi";
import CustomDateAdapter from "../../components/CustomDateAdapter";
import { Box, Button, Stack, TextField } from "@mui/material";

import { test } from "../../api/test";

export default function Test() {
  const [date, setDate] = useState([
    new Date(),
    new Date(Date.now() + 86400000),
  ]);

  const handleTest = () => {
    test(date)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <Page title="TEST | Tuanvq" style={{ paddingTop: 200 }}>
      <LocalizationProvider locale={viLocale} dateAdapter={CustomDateAdapter}>
        <DateRangePicker
          calendars={2}
          inputFormat="dd/MM/yyyy"
          disablePast
          name="date"
          startText="Ngày nhận phòng"
          endText="Ngày trả phòng"
          value={date}
          onChange={(newValue) => setDate([...newValue])}
          renderInput={(startProps, endProps) => (
            <Stack flexDirection="row" alignItems="center">
              <TextField {...startProps} />
              <Box sx={{ mx: 1, cursor: "default" }}> đến </Box>
              <TextField {...endProps} />
            </Stack>
          )}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        onClick={handleTest}
        style={{ marginTop: 50, padding: 50 }}
      >
        TEST
      </Button>
    </Page>
  );
}
