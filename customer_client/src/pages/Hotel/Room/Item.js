// UI lib
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";

// UI custom
import Iconify from "../../../components/Iconify";

// logic lib
import { Link as RouterLink } from "react-router-dom";

// logic custom

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  padding: 10,
  borderRadius: 4,
  marginBottom: 30,
  display: "flex",
  flexDirection: "row",
  boxShadow: "0 0 3pt 0 gray",
  [theme.breakpoints.down(759)]: {
    flexDirection: "column",
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  width: "40%",
  marginRight: 20,
  position: "relative",
  [theme.breakpoints.down(759)]: {
    width: "100%",
  },
}));

const InfoSection = styled(Box)(({ theme }) => ({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down(759)]: {
    marginTop: 15,
    width: "100%",
  },
}));

const InfoButton = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));
//#endregion

//----------------------------
const Item = () => {
  return (
    <RootStyle>
      <ImageSection>
        <img
          src="/static/room/banner.jpg"
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
        <Tooltip title="ẢNH" placement="top">
          <IconButton
            onClick={() => alert("TEST")}
            style={{ position: "absolute", bottom: 8, left: 8 }}
          >
            <Iconify
              icon="ion:images"
              style={{
                width: 30,
                height: 30,
                color: "#FFF",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Tooltip>
      </ImageSection>
      <InfoSection>
        <Typography variant="h4">Biệt thự 2 phòng ngủ, hướng biển</Typography>
        <Stack
          sx={{ width: "100%", height: 50 }}
          alignItems="center"
          flexDirection="row"
        >
          <Iconify
            icon="bi:crop"
            style={{ marginRight: 10, width: 20, height: 20 }}
          />
          <Typography variant="body2" style={{ marginRight: 10 }}>
            37m²
          </Typography>
          <Divider
            orientation="vertical"
            style={{
              height: 15,
              width: 2,
              backgroundColor: "#252525",
              marginRight: 10,
            }}
          />
          <Iconify
            style={{ marginRight: 15, width: 20, height: 20 }}
            icon="bi:people"
          />
          <Typography variant="body2" style={{ marginRight: 10 }}>
            2 người lớn và 2 trẻ em
          </Typography>
        </Stack>
        <InfoButton variant="body1" onClick={() => alert("Chi tiết phòng")}>
          Chi tiết phòng
        </InfoButton>
        <Stack
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="flex-end"
          style={{ flexGrow: 1 }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            style={{ marginBottom: 10 }}
          >
            <Typography variant="body2">Chỉ từ</Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "primary.main", px: 1 }}
            >
              1.935.200 đ
            </Typography>
            <Typography variant="body2">/ đêm</Typography>
          </Stack>
          <Button variant="contained" component={RouterLink} to="#">
            <Typography variant="h6">ĐẶT PHÒNG</Typography>
          </Button>
        </Stack>
      </InfoSection>
    </RootStyle>
  );
};

export default Item;
