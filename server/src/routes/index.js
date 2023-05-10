import express from "express";

import userRoutes from "./user.js";
import adminRoutes from "./admin.js";
import hotelRoutes from "./hotel.js";
import roomRoutes from "./room.js";
import roomTypeRoutes from "./room_type.js";
import roomServiceRoutes from "./room_service.js";
import bookingRoutes from "./booking.js";
import expenseRoutes from "./expense.js";
import backupRoutes from "./backup.js";
import testRoutes from "./test.js";
import accountRoutes from "./account.js";
import dashboardRoutes from "./dashboard.js";
import logRoutes from "./log.js";
import reviewRoutes from "./review.js";
import discountRoutes from "./discount.js";
import comboRoutes from "./combo.js";
import peakDayRoutes from "./peak_day.js";
import chatRoutes from "./chat.js";
import eventRoutes from "./event.js";

const router = express.Router();

router.use("/dashboard", dashboardRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/hotel", hotelRoutes);
router.use("/room", roomRoutes);
router.use("/room_type", roomTypeRoutes);
router.use("/room_service", roomServiceRoutes);
router.use("/booking", bookingRoutes);
router.use("/expense", expenseRoutes);
router.use("/test", testRoutes);
router.use("/backup", backupRoutes);
router.use("/account", accountRoutes);
router.use("/log", logRoutes);
router.use("/review", reviewRoutes);
router.use("/discount", discountRoutes);
router.use("/combo", comboRoutes);
router.use("/peak_day", peakDayRoutes);
router.use("/chat", chatRoutes);
router.use("/event", eventRoutes);

export default router;
