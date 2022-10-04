import express from "express";
import {
  createGroupChat,
  getListMessage,
  searchChatGroup,
  searchUserForChat,
  searchContact,
} from "../controllers/chat.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";
import { groupChatUploader } from "../middlewares/uploader.js";

const router = express.Router();

router.get("/:group_id", adminAuthMiddleware, getListMessage);
router.post("/user/search", adminAuthMiddleware, searchUserForChat);
router.post("/contact/search", adminAuthMiddleware, searchContact);
router.get("/search/:partner_id", adminAuthMiddleware, searchChatGroup);
router.post(
  "/group/new",
  [adminAuthMiddleware, groupChatUploader.single("profile_image")],
  createGroupChat
);
export default router;
