import express from "express";
import {
  createEvent,
  getAllEventByUser,
  updateEvent,
  deleteEvent,
} from "../controllers/event.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, getAllEventByUser);
router.post("/new", adminAuthMiddleware, createEvent);
router.put("/update/:id", adminAuthMiddleware, updateEvent);
router.delete("/delete/:id", adminAuthMiddleware, deleteEvent);

export default router;
