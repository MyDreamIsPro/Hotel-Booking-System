import { useState } from "react";
// UI lib
import { Typography } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import List from "./ReviewList";
import UpdateDialog from "./UpdateDialog";
import DetailDialog from "./DetailDialog";
// logic lib
// logic custom
//----------------------------

const Review = () => {
  const [id, setId] = useState();
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    content: "",
    buttonText: "",
    buttonColor: "",
    type: "",
    successMessage: "",
  });

  return (
    <Page title="BÀI ĐÁNH GIÁ">
      <Typography variant="h4" mb={4}>
        BÀI ĐÁNH GIÁ
      </Typography>
      <List
        setId={setId}
        setDialogContent={setDialogContent}
        setOpenReviewDialog={setOpenReviewDialog}
      />
      <UpdateDialog
        id={id}
        setId={setId}
        dialogContent={dialogContent}
        open={openReviewDialog}
        setOpen={setOpenReviewDialog}
      />
    </Page>
  );
};

export default Review;
