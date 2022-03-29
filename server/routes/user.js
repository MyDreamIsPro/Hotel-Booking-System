import express from "express";
import { login, signup, ping, logout } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/:id", isLoggedIn, getUserInfo);
router.post("/login", login);
router.post("/signup", signup);
router.post("/ping", ping);
router.post("/logout", logout);
// router.patch("/update/:id", isLoggedIn, updateUser);
export default router;
