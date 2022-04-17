import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CompletePage = () => {
  return (
    <Box style={{ paddingBottom: 50 }}>
      <img
        src="/static/booking/complete.png"
        alt="illustration"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Stack flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          style={{ marginBottom: 15 }}
          textAlign="center"
          color="primary"
        >
          Đặt phòng thành công
        </Typography>
        <Button
          component={Link}
          to="/account"
          variant="outlined"
          style={{ padding: 10, width: 250 }}
        >
          XEM CHI TIẾT
        </Button>
      </Stack>
    </Box>
  );
};

export default CompletePage;
