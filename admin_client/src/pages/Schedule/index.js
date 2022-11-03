import { useState } from "react";
// UI lib
import { Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// UI custom
import Page from "../../components/Page";
import Calendar from "./Calendar";
import Form from "./ScheduleForm";
import ConfirmationDialog from "../../components/ConfirmationDialog";
// logic lib
// logic custom
//#region CSS
//#endregion

//----------------------------
const Schedule = () => {
  const [editedId, setEditedId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  return (
    <Page title="Lịch">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">LỊCH</Typography>
        <Button
          startIcon={<AddIcon />}
          style={{ height: 40 }}
          variant="contained"
          onClick={handleOpenDialog}
        >
          SỰ KIỆN MỚI
        </Button>
      </Stack>
      <Calendar
        setOpenDialog={setOpenDialog}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setEditedId={setEditedId}
      />
      <Form
        open={openDialog}
        setOpen={setOpenDialog}
        startDate={startDate}
        endDate={endDate}
        editedId={editedId}
        setEditedId={setEditedId}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
      <ConfirmationDialog
        deleteType="EVENT"
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        id={editedId}
        setId={setEditedId}
        title="Xóa sự kiện"
        performSuccess={handleCloseDialog}
        performCancel={handleCloseDialog}
      />
    </Page>
  );
};

export default Schedule;
