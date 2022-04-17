// UI lib
import {
  Box,
  Container,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// UI custom
import Page from "../../components/Page";
import Filter from "./Filter";
import List from "./List";
import LoadingList from "./LoadingList";
// logic lib
// logic custom

//#region CSS
const ResultStyle = styled(Box)(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down(720)]: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
//#endregion

//----------------------------

const HotelList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState(1);
  return (
    <Page title="Booking | TuanVQ">
      <Filter setIsLoading={setIsLoading} />
      <Container maxWidth="lg">
        <ResultStyle>
          <Typography variant="h6">Hiển thị 41 kết quả phù hợp</Typography>
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="body1" style={{ marginRight: 10 }}>
              Sắp xếp theo
            </Typography>
            <TextField
              label=""
              name="filter"
              variant="outlined"
              select
              value={filterValue}
              disabled={isLoading}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <MenuItem value={1}>Gần đây nhất</MenuItem>
              <MenuItem value={2}>Đánh giá, cao đến thấp</MenuItem>
              <MenuItem value={3}>Đánh giá, thấp đến cao</MenuItem>
              <MenuItem value={4}>Hữu ích nhất</MenuItem>
            </TextField>
          </Stack>
        </ResultStyle>
      </Container>
      {isLoading ? <LoadingList /> : <List />}
    </Page>
  );
};

export default HotelList;
