import { useState } from "react";
import { Box, Button } from "@mui/material";
import Page from "../../components/Page";
import Editor from "./CustomEditor";
import RichTextExample from "./RichTextExample";
import "./index.css";
//-----------------------------------------
//#region EXAMPLE
//#endregion

const Test = () => {
  const [text, setText] = useState("");
  return (
    <Page title="TEST">
      <Box
        boxShadow={3}
        style={{ borderRadius: 4, marginTop: 30, padding: 20 }}
      >
        <Editor />
        {/* <RichTextExample /> */}
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </Box>
    </Page>
  );
};

export default Test;
