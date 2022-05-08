import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  updateRoom,
} from "../controllers/room.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/list", adminAuthMiddleware, getAllRoom);
router.post("/new", adminAuthMiddleware, createRoom);
router.put("/update/:id", adminAuthMiddleware, updateRoom);
router.delete("/delete/:id", adminAuthMiddleware, deleteRoom);

export default router;
