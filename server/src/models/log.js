import mongoose from "mongoose";

const LogSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  type: {
    type: Number,
    required: true,
  },
  object_id: {
    type: Number,
    required: true,
  },
  time_stamp: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Log", LogSchema);
