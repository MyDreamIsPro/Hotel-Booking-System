import { useState } from "react";
// UI lib
import {
  Box,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Item from "./Item";
import Filter from "./Filter";
import Result from "./Result";
// UI custom

// logic lib

// logic custom

//#region CSS
const ContentStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down(1144)]: {
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
  },
}));

const RoomListWrapper = styled(Box)(({ theme }) => ({
  width: "70%",
  marginRight: 25,
  [theme.breakpoints.down(1144)]: {
    width: "100%",
    marginRight: 0,
  },
}));
//#endregion

//----------------------------

const Room = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState(1);
  return (
    <Box
      style={{
        width: "100%",
        paddingTop: 20,
      }}
    >
      <Filter />
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        style={{ marginTop: 20, marginBottom: 10 }}
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
      {/* RoomList */}
      <ContentStyle>
        <RoomListWrapper>
          <Item />
          <Item />
          <Item />
          <Item />
        </RoomListWrapper>
        <Result />
      </ContentStyle>
    </Box>
  );
};

export default Room;
