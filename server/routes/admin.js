import express from "express";
import {
  login,
  signup,
  logout,
  checkAuth,
  changePassword,
  getInfo,
} from "../controllers/admin.js";
import { authMiddleware } from "../middlewares/auth.js";
import { uploader } from "../middlewares/uploader.js";

const router = express.Router();

// router.get("/:id", isLoggedIn, getUserInfo);
router.get("/check", authMiddleware, checkAuth);
router.post("/change-password", authMiddleware, changePassword);
router.post("/login", login);
router.post("/signup", signup);
router.get("/", authMiddleware, getInfo);
router.post("/logout", logout);

export default router;
