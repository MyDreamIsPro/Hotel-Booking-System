import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { STRING } from "../constants";
const ProtectedRoute = () => {
  const auth = localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY);
  if (auth) return <MainLayout />;
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
