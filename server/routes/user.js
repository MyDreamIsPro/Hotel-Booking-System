import express from "express";
import {
  login,
  signup,
  ping,
  logout,
  getInfo,
  updateInfo,
  changePassword,
  checkAuth,
} from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";
import { uploader } from "../middlewares/uploader.js";

const router = express.Router();

// router.get("/:id", isLoggedIn, getUserInfo);
router.get("/check", authMiddleware, checkAuth);
router.post("/change-password", authMiddleware, changePassword);
router.post("/login", login);
router.post("/signup", signup);
router.get("/", authMiddleware, getInfo);
router.post(
  "/update",
  [authMiddleware, uploader.single("profile_image")],
  updateInfo
);
router.post("/logout", logout);
router.post("/ping", ping);
router.post("/upload", uploader.array("images", 12), (req, res) => {
  // change to uploader.single("field_name") if you want to upload an image only
  res.status(200).send("UPLOAD COMPLETED");
});
export default router;
