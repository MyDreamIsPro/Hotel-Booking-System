import { useEffect, useState, useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/user";
import NotificationContext from "../context/Context";
// -----------------------------------------------
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const context = useContext(NotificationContext);
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        context.setNotification({
          type: "error",
          content: "Phiên đăng nhập hết hạn",
        });
        context.setOpen(true);
        navigate("/login", { replace: true });
      });
  }, []);

  return isAuthenticated ? (
    <MainLayout />
  ) : (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default ProtectedRoute;
