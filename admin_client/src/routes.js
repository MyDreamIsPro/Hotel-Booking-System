import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// layouts
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Room from "./pages/Room";
import Hotel from "./pages/Hotel";
import Test from "./pages/Test";
import HotelService from "./pages/HotelServices";
// ----------------------------------------------------------------------

export default function AppRoutes() {
  return (
    <Routes>
      {/* auth pages (important: do not place under /auth path) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* protected routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="hotel" element={<Hotel />} />
        {/* <Route path="hotel" element={<Outlet />}>
          <Route index element={<Navigate to="/hotel/list" replace />} />
          <Route path="list" element={<Hotel />} />
          <Route path="services" element={<HotelService />} />
        </Route> */}
        <Route path="room" element={<Room />} />
        <Route path="test" element={<Test />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
