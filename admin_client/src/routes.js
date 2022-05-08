import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// layouts
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Hotel from "./pages/Hotel";
import Room from "./pages/Room";
import RoomService from "./pages/RoomService";
import RoomType from "./pages/RoomType";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
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
        <Route path="room" element={<Outlet />}>
          <Route index element={<Navigate to="/room/list" replace />} />
          <Route path="list" element={<Room />} />
          <Route path="service" element={<RoomService />} />
          <Route path="type" element={<RoomType />} />
        </Route>
        <Route path="test" element={<Test />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
