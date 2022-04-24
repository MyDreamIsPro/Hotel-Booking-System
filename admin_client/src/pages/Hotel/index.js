import { useState } from "react";
// UI lib
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// UI custom
import Page from "../../components/Page";
import Form from "./HotelForm";
import List from "./HotelList";
// logic lib
// logic custom

//----------------------------
const Hotel = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <Page title="Thêm mới khách sạn">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Khách sạn</Typography>
        <Button
          startIcon={<AddIcon />}
          style={{ height: 40 }}
          variant="contained"
          onClick={handleOpenDialog}
        >
          THÊM MỚI
        </Button>
      </Stack>
      <Form openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <List />
    </Page>
  );
};

export default Hotel;
