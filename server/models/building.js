import mongoose from "mongoose";

const BuildingSchema = mongoose.Schema({
  building_number: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  modifiedDate: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Building", BuildingSchema);
