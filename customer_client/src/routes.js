import { Navigate, useRoutes } from "react-router-dom";
// layouts
import MainLayout from "./layouts/MainLayout";
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "user", element: <User /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
