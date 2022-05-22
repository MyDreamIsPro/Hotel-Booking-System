import express from "express";
import {
  login,
  signup,
  logout,
  checkAuth,
  getAllUserForForm,
} from "../controllers/admin.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/:id", isLoggedIn, getUserInfo);
router.get("/auth", adminAuthMiddleware, checkAuth);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

// management
router.get("/user/list/form", adminAuthMiddleware, getAllUserForForm);

export default router;
