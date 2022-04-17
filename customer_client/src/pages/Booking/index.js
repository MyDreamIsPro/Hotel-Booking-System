// UI lib
import { Box, Container, styled } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import BookingInfo from "./BookingInfo";
import StepLayout from "./StepLayout";
// logic lib

// logic custom

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down(920)]: {
    flexDirection: "column-reverse",
    justifyContent: "center",
  },
}));
//#endregion

//----------------------------
const Invoice = () => {
  return (
    <Page title="Hóa đơn | TuanVQ">
      <Container maxWidth="lg" style={{ paddingTop: 20 }}>
        <RootStyle>
          <StepLayout />
          <BookingInfo />
        </RootStyle>
      </Container>
    </Page>
  );
};

export default Invoice;
