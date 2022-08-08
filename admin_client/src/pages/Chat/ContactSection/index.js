import { useState } from "react";
// UI lib
import {
  Button,
  Stack,
  Typography,
  Box,
  styled,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// UI custom
import Page from "../../../components/Page";
import Contact from "./Contact";
// logic lib
const RootContainer = styled(Box)((theme) => ({
  width: "25%",
  height: "100%",
  borderRight: "2px solid #637381",
}));

const ListContact = styled(Box)({
  overflow: "auto",
  height: "calc(100% - 90px)",
  "&::-webkit-scrollbar": {
    width: "7px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D7DBDF",
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});
// logic custom
//----------------------------

const ContactSection = ({ listContact, setCurrentContact }) => {
  return (
    <RootContainer>
      <Stack p={2} style={{ height: 90 }}>
        <TextField
          name="contact"
          placeholder="Tìm kiếm"
          //   onFocus={() => console.log("focus ne")}
          //   onBlur={() => console.log("lose focus ne")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="medium" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <ListContact>
        {listContact.length > 0 ? (
          listContact.map((item, index) => (
            <Contact
              key={index}
              data={item}
              setCurrentContact={setCurrentContact}
            />
          ))
        ) : (
          <Typography textAlign="center" variant="body1" fontWeight="bold">
            Chưa có ai
          </Typography>
        )}
      </ListContact>
    </RootContainer>
  );
};

export default ContactSection;
