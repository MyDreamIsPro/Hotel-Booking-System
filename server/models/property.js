import mongoose from "mongoose";

const PropertySchema = mongoose.Schema({
  name: { type: String, unique: true },
});

export default mongoose.model("Property", PropertySchema);
