import { Box, Button } from "@mui/material";
import Page from "../components/Page";
import IncomeExpenseChart from "../components/TestChart";
//-----------------------------------------
const MONTHLY = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
];
const Test = () => {
  const income = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 12000000)
  );
  return (
    <Page title="TEST">
      <Box
        boxShadow={3}
        style={{ borderRadius: 4, marginTop: 30, padding: 10 }}
      >
        <IncomeExpenseChart income={income} categories={MONTHLY} />
      </Box>
    </Page>
  );
};

export default Test;
