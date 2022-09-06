import mongoose from "mongoose";
import Message from "../models/message.js";
import { STRING } from "../constants/constants.js";

export const getGroupMessages = async (req, res) => {
  const { group_id } = req.params;
  try {
    const data = await Message.find({ chat_group: group_id })
      .populate("sender")
      .lean();
    for (let message of data) {
      message.sender._id = message.sender._id.toString();
    }
    // setTimeout(() => {
    res.status(202).send(data);
    // }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
