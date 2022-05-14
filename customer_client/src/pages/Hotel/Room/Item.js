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
import { formatNumber } from "../../../utils/Number";

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
const Item = ({
  setOpenViewer,
  setDataViewer,
  roomType,
  selectedRooms,
  setSelectedRooms,
}) => {
  const handleSelectRoom = () => {
    setSelectedRooms([
      ...selectedRooms,
      { _id: roomType._id, name: roomType.name, rent_bill: roomType.rent_bill },
    ]);
  };

  const handleOpenViewer = () => {
    setDataViewer(roomType);
    setOpenViewer(true);
  };
  return (
    <RootStyle>
      <ImageSection>
        <img
          src={roomType.images[0]}
          style={{ objectFit: "cover", borderRadius: 4, height: "100%" }}
          alt="banner"
        />
      </ImageSection>
      <InfoSection>
        <Typography variant="h5">{roomType.name}</Typography>
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
            {formatNumber(roomType.size)}m²
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
            {roomType.adult} người lớn và {roomType.kid} trẻ em
          </Typography>
        </Stack>
        <InfoButton variant="body1" onClick={handleOpenViewer}>
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
              {formatNumber(roomType.rent_bill)} đ
            </Typography>
            <Typography variant="body2">/ đêm</Typography>
          </Stack>
          <Button variant="contained" onClick={handleSelectRoom}>
            ĐẶT PHÒNG
          </Button>
        </Stack>
      </InfoSection>
    </RootStyle>
  );
};

export default Item;
