import mongoose from "mongoose";
import Room from "../models/room.js";
import { STRING } from "../constants/constants.js";

export const getAllRoom = async (req, res) => {
  try {
    const room = await Room.find()
      .populate("hotel", ["_id", "name"])
      .populate("room_type", ["_id", "name"]);
    setTimeout(() => {
      return res.status(200).json(room);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createRoom = async (req, res) => {
  const room = req.body;
  try {
    const newRoom = new Room({
      number: Number(room.number),
      hotel: room.hotel._id,
      room_type: room.room_type._id,
    });
    await newRoom.save();
    return res.status(200).json(newRoom);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const room = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room with that id");
  }
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        number: Number(room.number),
        hotel: room.hotel._id,
        room_type: room.room_type._id,
      },
      { new: true }
    );
    res.status(202).json(updatedRoom);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room with that id");
  }
  try {
    await Room.findOneAndRemove({ _id: id });
    res.status(202).send("Room deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
