import express from "express";
import {
  login,
  signup,
  logout,
  checkAuth,
  getAllUserForForm,
  getInfo,
  changePassword,
  updateInfo,
  searchUserForChat,
} from "../controllers/admin.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";
import { userUploader } from "../middlewares/uploader.js";

const router = express.Router();

router.get("/auth", adminAuthMiddleware, checkAuth);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.post("/change-password", adminAuthMiddleware, changePassword);
router.get("/", adminAuthMiddleware, getInfo);
router.post(
  "/update",
  [adminAuthMiddleware, userUploader.single("profile_image")],
  updateInfo
);

// ADMIN
router.get("/user/list/form", adminAuthMiddleware, getAllUserForForm);
router.post("/user/search/chat", adminAuthMiddleware, searchUserForChat);

export default router;
