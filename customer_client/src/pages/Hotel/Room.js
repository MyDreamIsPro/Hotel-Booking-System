// UI lib
import { Box, Typography } from "@mui/material";
import Item from "./Item";
// UI custom

// logic lib

// logic custom

//#region CSS

//#endregion

//----------------------------

const Room = () => {
  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <Item />
      <Item />
      <Item />
      <Item />
    </Box>
  );
};

export default Room;
