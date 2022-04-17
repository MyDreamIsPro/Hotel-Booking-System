// UI lib
import {
  Stack,
  styled,
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import Iconify from "../../../components/Iconify";
// UI custom

// logic lib

// logic custom

//#region CSS
const InfoSection = styled(Box)(({ theme }) => ({
  width: "40%",
}));
const ContentSection = styled(Box)(({ theme }) => ({
  width: "60%",
}));
//#endregion

//----------------------------
const CommentItem = () => {
  return (
    <Box style={{ paddingBottom: 30 }}>
      <Box style={{ backgroundColor: "#F4F4F4", borderRadius: 4, padding: 20 }}>
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          10,0 - "Khách sạn đẹp"
        </Typography>
        <Typography variant="body2" color="gray">
          Đã nhận xét vào 03 tháng tư 2022
        </Typography>
        <Divider
          style={{
            borderBottomWidth: 0.5,
            backgroundColor: "#a8a8a8",
            marginBottom: 15,
            marginTop: 15,
          }}
        />
        <Typography variant="body1" textAlign="justify">
          Khách sạn đẹp, nhân viên phục vụ dễ thương nhiệt tình hoà đồng . Vị
          trí tiện lợi . Không gì phải chê nơi đáng để ở . Tôi sẽ tiếp tục ủng
          hộ tiếp . Ở 6 ngày 5 đêm tại đây đã làm tôi lưu luyến vì thái độ phục
          vụ của nhân viên . Rất dễ thương
        </Typography>
        <Divider
          style={{
            borderBottomWidth: 0.5,
            backgroundColor: "#a8a8a8",
            marginBottom: 15,
            marginTop: 15,
          }}
        />
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="body2">Tuấn</Typography>
          <Divider
            flexItem
            orientation="vertical"
            style={{
              width: 2,
              backgroundColor: "#a8a8a8",
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <Typography variant="body2">Gia đình có em bé</Typography>
          <Divider
            flexItem
            orientation="vertical"
            style={{
              width: 2,
              backgroundColor: "#a8a8a8",
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <Typography variant="body2">Đã ở 2 đêm vào tháng ba 2022</Typography>
        </Stack>
      </Box>
      <Stack
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ marginTop: 15, marginBottom: 15 }}
      >
        <Typography fontWeight="bold">
          Bạn thấy nhận xét này có hữu ích không?
        </Typography>
        <IconButton style={{ marginLeft: 10, marginRight: 10 }}>
          <Iconify icon="bx:like" sx={{ color: "success.main" }} />
        </IconButton>
        <Divider
          flexItem
          orientation="vertical"
          style={{
            width: 2,
            backgroundColor: "#252525",
          }}
        />
        <IconButton style={{ marginLeft: 10, marginRight: 10 }}>
          <Iconify icon="bx:dislike" sx={{ color: "error.main" }} />
        </IconButton>
      </Stack>
      <Divider />
    </Box>
  );
};

export default CommentItem;
