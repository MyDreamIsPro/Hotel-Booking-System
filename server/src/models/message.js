import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  content: {
    type: String,
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

export default mongoose.model("Message", MessageSchema);
