import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
// logic lib
import { Link as RouterLink } from "react-router-dom";
// logic
import { INTEGER } from "../../constants";
import { Avatar } from "@mui/material";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  justifyContent: "center",
  height: INTEGER.APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    height: INTEGER.APP_BAR_DESKTOP,
  },
}));

const Navbar = () => {
  return (
    <AppBarStyle>
      <ToolbarStyle>
        <Link to="/404" component={RouterLink} underline="none">
          <Typography sx={{ color: "text.primary" }} variant="h5">
            TuanVQ
          </Typography>
        </Link>
      </ToolbarStyle>
    </AppBarStyle>
  );
};

export default Navbar;
