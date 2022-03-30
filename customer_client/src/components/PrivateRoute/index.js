import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { STRING } from "../../constants";

const PrivateRoute = ({ children, redirectPath }) => {
  const isAuthenticated = localStorage.getItem(
    STRING.LOCAL_STORAGE_PROFILE_KEY
  );
  if (!isAuthenticated) return <Navigate to={redirectPath} replace />;
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  redirectPath: PropTypes.string,
};

export default PrivateRoute;
