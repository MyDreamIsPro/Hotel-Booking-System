import express from "express";
import { getGroupMessages } from "../controllers/message.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/list/:group_id", adminAuthMiddleware, getGroupMessages);

export default router;
