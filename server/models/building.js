import mongoose from "mongoose";

const BuildingSchema = mongoose.Schema({
  building_number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  size: { type: Number, required: true },
  numberOfRooms: { type: Number, required: true },
  description: { type: String, required: true },
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
