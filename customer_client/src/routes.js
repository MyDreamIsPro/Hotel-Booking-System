import { Navigate, useRoutes } from "react-router-dom";
// layouts
import MainLayout from "./layouts/MainLayout";
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import PrivateRoute from "./components/PrivateRoute";
import Test from "./pages/Test";
import Hotel from "./pages/Hotel";
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
        { path: "test", element: <Test /> },
        { path: "register", element: <Register /> },
        { path: "hotel/:id", element: <Hotel /> },
        // Protected routes
        {
          path: "account",
          element: (
            <PrivateRoute redirectPath="/login">
              <Account />
            </PrivateRoute>
          ),
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
