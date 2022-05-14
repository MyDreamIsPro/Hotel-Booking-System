import { useState } from "react";
import { MenuItem, Stack, TextField, Typography, styled } from "@mui/material";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  [theme.breakpoints.down(469)]: {
    flexDirection: "column-reverse",
  },
}));

const Filter = ({ data }) => {
  const [filterValue, setFilterValue] = useState(1);
  return (
    <RootStyle>
      {data && (
        <Typography variant="h6">
          Quý khách có {data.length} đơn đặt chỗ
        </Typography>
      )}
      <Stack flexDirection="row" alignItems="center">
        <Typography variant="body1" style={{ marginRight: 10 }}>
          Trạng thái
        </Typography>
        <TextField
          name="filter"
          variant="outlined"
          select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <MenuItem value={1}>Tất cả</MenuItem>
          <MenuItem value={2}>Sắp tới</MenuItem>
          <MenuItem value={3}>Hoàn tất</MenuItem>
          <MenuItem value={4}>Đã hủy</MenuItem>
        </TextField>
      </Stack>
    </RootStyle>
  );
};

export default Filter;
