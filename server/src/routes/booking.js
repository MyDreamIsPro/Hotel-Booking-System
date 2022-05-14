import express from "express";
import { createBooking, getAllBookingByUser } from "../controllers/booking.js";
import { userAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", userAuthMiddleware, createBooking);
router.get("/list/:userId", userAuthMiddleware, getAllBookingByUser);

export default router;
