import mongoose from "mongoose";

const ChatGroupSchema = mongoose.Schema({
  name: { type: String, trim: true, default: "" },
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  last_message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  last_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  private: {
    type: Boolean,
    required: true,
  },
  isEmpty: {
    type: Boolean,
    default: true,
  },
  modified_date: { type: Date, default: new Date() },
  created_date: { type: Date, default: new Date() },
});

export default mongoose.model("ChatGroup", ChatGroupSchema);
