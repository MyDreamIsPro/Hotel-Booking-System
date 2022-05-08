import express from "express";
import { login, signup, logout, checkAuth } from "../controllers/admin.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/:id", isLoggedIn, getUserInfo);
router.get("/auth", adminAuthMiddleware, checkAuth);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;
