import express from "express";
import {
  getListMessage,
  searchChatGroup,
  searchUserForChat,
} from "../controllers/chat.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:group_id", adminAuthMiddleware, getListMessage);
router.post("/user/search", adminAuthMiddleware, searchUserForChat);
router.get("/search/:partner_id", adminAuthMiddleware, searchChatGroup);
export default router;
