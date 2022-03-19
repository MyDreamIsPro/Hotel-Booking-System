import mongoose from "mongoose";
import { BOOLEAN } from "../constants/constants";

const RoomSchema = mongoose.Schema({
  room_number: { type: Number, required: true, unique: true },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
    required: true,
    unique: false,
  },
  rent_bill: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: BOOLEAN.EMPTY,
  },
  bed_number: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Date,
    default: new Date(),
  },
  modified_date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Room", RoomSchema);
