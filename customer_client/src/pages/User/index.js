// UI lib
import { Button, styled } from "@mui/material";
// UI custom
import Page from "../../components/Page";
// logic lib
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// logic custom
import { INTEGER } from "../../constants";
import { ping } from "../../api/user";
import { logout } from "../../redux/actions/user";

const RootStyle = styled(Page)({
  paddingTop: INTEGER.APP_BAR_DESKTOP + 24,
  minHeight: "100vh",
});

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.auth);

  const get = () => ping();
  return (
    <RootStyle>
      <Button variant="outlined" onClick={get}>
        PING
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(
            logout(
              user,
              () => {
                navigate("/");
              },
              () => {}
            )
          )
        }
      >
        LOGOUT
      </Button>
    </RootStyle>
  );
};

export default User;
