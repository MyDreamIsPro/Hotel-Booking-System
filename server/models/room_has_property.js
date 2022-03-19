import mongoose from "mongoose";

const RoomHasPropertySchema = mongoose.Schema({
  room_has_property_number: { type: Number, required: true, unique: true },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
});

RoomHasPropertySchema.index({ room_id: 1, property_id: 1 }, { unique: true });

export default mongoose.model("RoomHasProperty", RoomHasPropertySchema);
