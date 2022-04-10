import { Box } from "@mui/material";
import CommentItem from "./CommentItem";

const CommentList = () => {
  return (
    <Box style={{ width: "100%" }}>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </Box>
  );
};

export default CommentList;
