// UI lib
import { Container, styled } from "@mui/material";
import { useState } from "react";
// UI custom
import Page from "../../components/Page";
// logic custom
import { INTEGER } from "../../constants";
import Filter from "./Filter";
import List from "./List";
import LoadingList from "./LoadingList";

const RootStyle = styled(Page)({
  paddingTop: INTEGER.APP_BAR_DESKTOP + 12,
  minHeight: "100vh",
});

const Booking = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <RootStyle title="Booking | TuanVQ">
      <Filter setIsLoading={setIsLoading} />
      {isLoading ? <LoadingList /> : <List />}
    </RootStyle>
  );
};

export default Booking;
