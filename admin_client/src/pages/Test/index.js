import { useState } from "react";
import { Box, Button } from "@mui/material";
import Page from "../../components/Page";
import ImagesExample from "./Editor";
//-----------------------------------------
//#region EXAMPLE
//#endregion

const Test = () => {
  const [text, setText] = useState("");
  return (
    <Page title="TEST">
      <Box
        boxShadow={3}
        style={{ borderRadius: 4, marginTop: 30, padding: 100 }}
      >
        <ImagesExample />
      </Box>
    </Page>
  );
};

export default Test;
