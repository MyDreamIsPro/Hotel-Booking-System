import express from "express";
import {
  createBooking,
  getAllBookingByUser,
  getAllBookingForAdmin,
  cancelBooking,
  cancelBookingByUser,
  checkInBooking,
  checkOutBooking,
  createPaymentUrl,
  checkPaymentReturn,
} from "../controllers/booking.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", userAuthMiddleware, createBooking);
router.get("/list", userAuthMiddleware, getAllBookingByUser);
router.get("/cancel/:id", userAuthMiddleware, cancelBookingByUser);
router.post("/create-payment-url", createPaymentUrl);
router.post("/check-payment-return", checkPaymentReturn);

// management
router.get("/admin/cancel/:id", adminAuthMiddleware, cancelBooking);
router.get("/admin/list", adminAuthMiddleware, getAllBookingForAdmin);
router.get("/check-in/:id", adminAuthMiddleware, checkInBooking);
router.get("/check-out/:id", adminAuthMiddleware, checkOutBooking);

export default router;
