import express from "express";
import { getUserInfo, login, signup, updateUser } from "../controllers/user.js";
import { isLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id", isLoggedIn, getUserInfo);
router.post("/login", login);
router.post("/signup", signup);
router.patch("/update/:id", isLoggedIn, updateUser);
export default router;
