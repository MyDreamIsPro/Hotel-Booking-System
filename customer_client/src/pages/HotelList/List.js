// UI lib
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
// UI custom

// logic lib
import Item from "./Item";
// logic custom

//#region CSS

//#endregion

const BookingList = ({ setOpenImageViewer, setImages }) => {
  const hotels = useSelector((state) => state.hotelList);
  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      {hotels.map((hotel, index) => (
        <Item
          key={index}
          setImages={setImages}
          setOpenImageViewer={setOpenImageViewer}
          hotel={hotel}
        />
      ))}
    </Container>
  );
};

export default BookingList;
