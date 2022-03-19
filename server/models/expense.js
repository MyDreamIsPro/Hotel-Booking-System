import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema({
  expense_number: { type: Number, required: true, unique: true },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
    required: true,
    unique: false,
  },
  amount: { type: Number, default: 0 },
  description: { type: String, required: true },
  created_date: { type: Date, default: new Date() },
  modified_date: { type: Date, default: new Date() },
});

export default mongoose.model("Expense", ExpenseSchema);
