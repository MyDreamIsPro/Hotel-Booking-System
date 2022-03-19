import mongoose from "mongoose";

const CitySchema = mongoose.Schema({
  city_number: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("City", CitySchema);
