import { useState } from "react";
import PropTypes from "prop-types";
// UI lib
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
// UI custom
import Overview from "./Overview/Overview";
import Room from "./Room/Room";
import Review from "./Review/Review";
// logic lib

// logic custom

//#region CSS

//#endregion

//----------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Content = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      maxWidth="lg"
      style={{ backgroundColor: "#FFF", paddingTop: 20 }}
    >
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="TỔNG QUAN" {...a11yProps(0)} />
          <Tab label="HẠNG PHÒNG" {...a11yProps(1)} />
          <Tab label="ĐÁNH GIÁ" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Overview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Room />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Review />
      </TabPanel>
    </Container>
  );
};

export default Content;
