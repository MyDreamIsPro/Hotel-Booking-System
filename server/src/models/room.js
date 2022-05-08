import mongoose from "mongoose";
import { BOOLEAN } from "../constants/constants.js";

const RoomSchema = mongoose.Schema({
  number: { type: Number, required: true },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
    unique: false,
  },
  room_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true,
    unique: false,
  },
  status: {
    type: Boolean,
    default: BOOLEAN.EMPTY,
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

RoomSchema.index({ number: 1, hotel: 1 }, { unique: true });

export default mongoose.model("Room", RoomSchema);
