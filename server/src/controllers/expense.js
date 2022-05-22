import mongoose from "mongoose";
import Expense from "../models/expense.js";
import { STRING } from "../constants/constants.js";

export const getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.find().populate("hotel", ["name"]);
    setTimeout(() => {
      return res.status(200).json(expense);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createExpense = async (req, res) => {
  const expense = req.body;
  try {
    const maxExpenseNumber = await Expense.find()
      .sort({ number: -1 })
      .limit(1)
      .then((data) => (data[0] ? data[0].number : 0));
    const newExpense = new Expense({
      number: maxExpenseNumber + 1,
      hotel: expense.hotel,
      amount: Number(expense.amount),
      description: expense.description,
      created_date: new Date(),
    });
    await newExpense.save();
    return res.status(200).json(newExpense);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No expense with that id");
  }
  try {
    await Expense.findOneAndRemove({ _id: id });
    res.status(202).send("Expense deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No expense with that id");
  }
  const expense = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        hotel: expense.hotel,
        amount: Number(expense.amount),
        description: expense.description,
        modified_date: new Date(),
      },
      { new: true }
    );
    res.status(202).json(updatedExpense);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
