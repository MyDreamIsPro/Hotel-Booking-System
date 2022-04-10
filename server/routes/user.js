import express from "express";
import { login, signup, ping, logout } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";
import { uploader } from "../middlewares/uploader.js";

const router = express.Router();

// router.get("/:id", isLoggedIn, getUserInfo);
router.post("/login", login);
router.post("/signup", signup);
router.post("/ping", ping);
router.post("/logout", logout);
router.post("/upload", uploader.array("images", 12), (req, res) => {
  // change to uploader.single("field_name") if you want to upload an image only
  res.status(200).send("UPLOAD COMPLETED");
});
export default router;
