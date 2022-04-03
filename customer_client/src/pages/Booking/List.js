// UI lib
import { Container } from "@mui/material";
// UI custom

// logic lib
import Item from "./Item";
// logic custom

//#region CSS

//#endregion

const BookingList = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Container>
  );
};

export default BookingList;
