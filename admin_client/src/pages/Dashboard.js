// UI lib
// UI custom
import { Box, Grid } from "@mui/material";
import Page from "../components/Page";
// logic lib

// logic custom

//#region CSS

//#endregion

//----------------------------
const Dashboard = () => {
  return (
    <Page title="Tổng quan">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Box boxShadow={3} style={{ height: 200, borderRadius: 8 }}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box boxShadow={3} style={{ height: 200, borderRadius: 8 }}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box boxShadow={3} style={{ height: 200, borderRadius: 8 }}></Box>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Dashboard;
