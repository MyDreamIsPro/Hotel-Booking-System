// UI lib
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// UI custom
import Iconify from "../../components/Iconify";
// logic custom

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  width: "40%",
  height: "fit-content",
  borderRadius: 4,
  padding: 15,
  backgroundColor: "#FFF",
  [theme.breakpoints.down(920)]: {
    width: "100%",
    marginBottom: 20,
  },
}));
const AccordionStyle = styled(Accordion)({
  padding: 0,
  boxShadow: "none",
  border: "none",
  "&:before": {
    display: "none",
  },
});

const AccordionSummaryStyle = styled(AccordionSummary)({
  padding: 0,
});

const AccordionDetailsStyle = styled(AccordionDetails)({
  padding: 0,
});
//#endregion

//----------------------------
const BookingInfo = () => {
  return (
    <RootStyle boxShadow={3}>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Thông tin đặt phòng
      </Typography>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      <Typography variant="body1" fontWeight="bold">
        Coto Empire Nha Trang
      </Typography>
      {/* SCHEDULE */}
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Box>
          <Typography variant="body2" textAlign="center">
            Nhận phòng
          </Typography>
          <Typography variant="h6" textAlign="center">
            11.04.2022
          </Typography>
        </Box>
        <Iconify
          icon="ri:building-line"
          sx={{ width: 30, height: 30, color: "primary.main" }}
        />
        <Box>
          <Typography variant="body2" textAlign="center">
            Trả phòng
          </Typography>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            11.04.2022
          </Typography>
        </Box>
      </Stack>
      {/* NUM PEOPLE */}
      <Stack
        style={{ width: "100%" }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body2">
            Người lớn: <span style={{ fontWeight: "bolder" }}>1</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body2">
            Trẻ em: <span style={{ fontWeight: "bolder" }}>1</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body2">
            Em bé: <span style={{ fontWeight: "bolder" }}>1</span>
          </Typography>
        </Box>
      </Stack>
      {/* DURATION */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số đêm</Typography>
        <Typography variant="body1" fontWeight="bold">
          3 ngày 2 đêm
        </Typography>
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số phòng</Typography>
        <Typography variant="body1" fontWeight="bold">
          1
        </Typography>
      </Stack>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* ROOM LIST */}
      <AccordionStyle defaultExpanded>
        <AccordionSummaryStyle
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Thông tin phòng</Typography>
        </AccordionSummaryStyle>
        <AccordionDetailsStyle>
          {/* LIST */}
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="body1" style={{ maxWidth: "60%" }}>
              <span style={{ fontWeight: "bold" }}>Phòng 1:</span> Biệt thự 2
              phòng ngủ, hướng biển
            </Typography>
            <Typography variant="body1" color="primary" fontWeight="bold">
              123.000.000 đ
            </Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="body1" style={{ maxWidth: "60%" }}>
              <span style={{ fontWeight: "bold" }}>Phòng 2:</span> Biệt thự 2
              phòng ngủ, hướng biển
            </Typography>
            <Typography variant="body1" color="primary" fontWeight="bold">
              123.000.000 đ
            </Typography>
          </Stack>
        </AccordionDetailsStyle>
      </AccordionStyle>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* PRICE */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold">
          Tổng tiền:
        </Typography>
        <Typography variant="h3" color="primary" fontWeight="bold">
          123.987.000 <span style={{ fontSize: 17 }}>đ</span>
        </Typography>
      </Stack>
    </RootStyle>
  );
};

export default BookingInfo;
