import { useState } from "react";
// UI lib
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// UI custom
import Page from "../../components/Page";
import Form from "./HotelServicesForm";
import List from "./HotelServicesList";
// logic lib

// logic custom

//----------------------------

const HotelService = () => {
  const [editedId, setEditedId] = useState();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenEditDialog(true);
  };
  return (
    <Page title="Dịch vụ khách sạn">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Dịch vụ khách sạn</Typography>
        <Button
          startIcon={<AddIcon />}
          style={{ height: 40 }}
          variant="contained"
          onClick={handleOpenDialog}
        >
          THÊM MỚI
        </Button>
      </Stack>
      <List
        setOpenDeleteDialog={setOpenDeleteDialog}
        setOpenEditDialog={setOpenEditDialog}
        setEditedId={setEditedId}
      />
      <Form
        setEditedId={setEditedId}
        editedId={editedId}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
    </Page>
  );
};

export default HotelService;
