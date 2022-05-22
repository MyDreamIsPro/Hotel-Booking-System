import mongoose from "mongoose";
import User from "../models/User.js";
import { STRING } from "../constants/constants.js";

export const getAllAccount = async (req, res) => {
  try {
    const account = await User.find();
    setTimeout(() => {
      return res.status(200).json(account);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const banAccount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No account with that id");
  }
  try {
    const updatedAccount = await User.findByIdAndUpdate(
      id,
      {
        banned: true,
        modified_date: new Date(),
      },
      { new: true }
    );
    res.status(202).json(updatedAccount);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
export const activeAccount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No account with that id");
  }
  try {
    const updatedAccount = await User.findByIdAndUpdate(
      id,
      {
        banned: false,
        modified_date: new Date(),
      },
      { new: true }
    );
    res.status(202).json(updatedAccount);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
