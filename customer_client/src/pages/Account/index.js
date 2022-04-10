import { useState } from "react";
import PropTypes from "prop-types";
// UI lib
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// UI custom
import Page from "../../components/Page";
import Info from "./Info";
import Billing from "./Billing";
import Payment from "./Payment";
import Authentication from "./Authentication";
import SecurityIcon from "@mui/icons-material/Security";

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

const data = [
  {
    icon: <AccountBoxIcon />,
    label: "THÔNG TIN",
    index: 0,
    page: <Info />,
  },
  {
    icon: <CreditScoreIcon />,
    label: "LỊCH SỬ ĐẶT CHỖ",
    index: 1,
    page: <Billing />,
  },
  {
    icon: <AccountBalanceWalletIcon />,
    label: "PHƯƠNG THỨC THANH TOÁN",
    index: 2,
    page: <Payment />,
  },
  {
    icon: <SecurityIcon />,
    label: "MẬT KHẨU VÀ BẢO MẬT",
    index: 3,
    page: <Authentication />,
  },
];

const User = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Tài khoản | TuanVQ">
      <Container maxWidth="lg">
        <Typography variant="h4" style={{ marginTop: 20 }}>
          TÀI KHOẢN
        </Typography>
        <Box sx={{ borderBottom: 2, borderColor: "divider", marginBottom: 3 }}>
          <Tabs
            variant="scrollable"
            allowScrollButtonsMobile
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {data.map((item, index) => (
              <Tab
                key={index}
                icon={item.icon}
                iconPosition="start"
                label={item.label}
                {...a11yProps(item.index)}
              />
            ))}
          </Tabs>
        </Box>
        {data.map((item, index) => (
          <TabPanel key={index} value={value} index={item.index}>
            {item.page}
          </TabPanel>
        ))}
      </Container>
    </Page>
  );
};

export default User;
