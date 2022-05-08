import mongoose from "mongoose";
import { INTEGER } from "../constants/constants";

const BookingSchema = mongoose.Schema({
  booking_number: { type: Number, required: true, unique: true },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
    required: true,
    unique: false,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
    unique: false,
  },
  status: { type: Number, default: INTEGER.PENDING },
  effective_from: { type: Date, required: true },
  effective_to: { type: Date, required: true },
  amount: { type: Number, required: true },
  created_date: { type: Date, default: new Date() },
  modified_date: { type: Date, default: new Date() },
});

export default mongoose.model("Booking", BookingSchema);
