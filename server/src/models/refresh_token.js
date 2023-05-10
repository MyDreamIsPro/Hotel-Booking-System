import mongoose from "mongoose";

const RefreshTokenSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: {
    type: String,
    required: true,
    trim: true,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  issued_date: {
    type: Date,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
  created_date: { type: Date, default: new Date() },
  updated_date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("RefreshToken", RefreshTokenSchema);
