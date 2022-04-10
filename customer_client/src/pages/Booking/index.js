// UI lib
import {
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// UI custom
import Page from "../../components/Page";
// logic custom
import Filter from "./Filter";
import List from "./List";
import LoadingList from "./LoadingList";

const Booking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState(1);
  return (
    <Page title="Booking | TuanVQ">
      <Filter setIsLoading={setIsLoading} />
      <Container maxWidth="lg">
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
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
      </Container>
      {isLoading ? <LoadingList /> : <List />}
    </Page>
  );
};

export default Booking;
