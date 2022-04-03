import { Navigate, useRoutes } from "react-router-dom";
// layouts
import MainLayout from "./layouts/MainLayout";
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import PrivateRoute from "./components/PrivateRoute";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // Public routes
        { path: "", element: <Home /> },
        { path: "booking", element: <Booking /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "user",
          element: (
            <PrivateRoute redirectPath="/login">
              <User />
            </PrivateRoute>
          ),
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
        // Protected routes
        { path: "user", element: <User /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
