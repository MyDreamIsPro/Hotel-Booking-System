import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  chat_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatGroup",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  content: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Message", MessageSchema);
