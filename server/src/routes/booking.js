import express from "express";
import {
  createBooking,
  getAllBookingByUser,
  getAllBookingForAdmin,
  cancelBooking,
  checkInBooking,
  checkOutBooking,
} from "../controllers/booking.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", userAuthMiddleware, createBooking);
router.get("/list/:userId", userAuthMiddleware, getAllBookingByUser);
router.get("/cancel/:id", userAuthMiddleware, cancelBooking);

// management
router.get("/admin/cancel/:id", adminAuthMiddleware, cancelBooking);
router.get("/admin/list", adminAuthMiddleware, getAllBookingForAdmin);
router.get("/check-in/:id", adminAuthMiddleware, checkInBooking);
router.get("/check-out/:id", adminAuthMiddleware, checkOutBooking);

export default router;
