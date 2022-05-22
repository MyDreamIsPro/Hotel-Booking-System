import { useState } from "react";
// UI lib
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// UI custom
import ConfirmationDialog from "../../components/ConfirmationDialog";
import BookingDialog from "./BookingDialog";
import Page from "../../components/Page";
import Form from "./BookingForm";
import List from "./BookingList";
// logic lib

// logic custom

//----------------------------

const Booking = () => {
  const [editedId, setEditedId] = useState();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // BOOKING DIALOG
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    content: "",
    buttonText: "",
    type: "",
    successMessage: "",
  });
  // END BOOKING DIALOG

  const handleOpenDialog = () => {
    setOpenEditDialog(true);
  };
  return (
    <Page title="Đơn đặt chỗ">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">ĐƠN ĐẶT CHỖ</Typography>
        {/* <Button
          startIcon={<AddIcon />}
          style={{ height: 40 }}
          variant="contained"
          onClick={handleOpenDialog}
        >
          THÊM MỚI
        </Button> */}
      </Stack>
      <List
        setOpenDeleteDialog={setOpenDeleteDialog}
        setOpenEditDialog={setOpenEditDialog}
        setEditedId={setEditedId}
        setDialogContent={setDialogContent}
        setOpenBookingDialog={setOpenBookingDialog}
      />
      <Form
        setEditedId={setEditedId}
        editedId={editedId}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
      <ConfirmationDialog
        deleteType="BOOKING"
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        id={editedId}
        setId={setEditedId}
        title="Xóa đơn đặt chỗ"
      />
      <BookingDialog
        id={editedId}
        setId={setEditedId}
        open={openBookingDialog}
        setOpen={setOpenBookingDialog}
        dialogContent={dialogContent}
      />
    </Page>
  );
};

export default Booking;
