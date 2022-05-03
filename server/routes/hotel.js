import express from "express";
import {
  createHotel,
  getAllHotel,
  deleteHotel,
  updateHotel,
  getHotelByFilter,
  getHotelById,
} from "../controllers/hotel.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";
import { hotelUploader } from "../middlewares/uploader.js";
const router = express.Router();

router.post(
  "/new",
  [adminAuthMiddleware, hotelUploader.array("images")],
  createHotel
);
router.get("/:id", getHotelById);
router.get("/", adminAuthMiddleware, getAllHotel);
router.delete("/delete/:id", adminAuthMiddleware, deleteHotel);
router.put(
  "/update/:id",
  [adminAuthMiddleware, hotelUploader.array("images")],
  updateHotel
);
router.post("/search", getHotelByFilter);

export default router;
