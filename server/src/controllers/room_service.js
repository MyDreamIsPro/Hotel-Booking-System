import mongoose from "mongoose";
import RoomService from "../models/room_service.js";

export const getAllRoomServices = async (req, res) => {
  try {
    const roomService = await RoomService.find();
    setTimeout(() => {
      return res.status(200).json(roomService);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createRoomService = async (req, res) => {
  const roomService = req.body;
  try {
    const newRoomService = new RoomService(roomService);
    await newRoomService.save();
    return res.status(200).json(newRoomService);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateRoomService = async (req, res) => {
  const { id } = req.params;
  const roomService = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room_service with that id");
  }
  try {
    const updatedRoomService = await RoomService.findByIdAndUpdate(
      id,
      {
        ...roomService,
      },
      { new: true }
    );
    res.status(202).json(updatedRoomService);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteRoomService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room_service with that id");
  }
  try {
    await RoomService.findOneAndRemove({ _id: id });
    res.status(202).send("Room Service deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
