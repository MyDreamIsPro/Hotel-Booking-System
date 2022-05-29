import mongoose from "mongoose";
import RoomService from "../models/room_service.js";
import Log from "../models/log.js";
import { STRING, INTEGER } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Dịch vụ phòng",
    time_stamp: time,
  });
  await newLog.save();
};

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
    const TIME_STAMP = new Date();
    const newRoomService = new RoomService({
      ...roomService,
      created_date: TIME_STAMP,
    });
    await newRoomService.save();
    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
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
    const TIME_STAMP = new Date();
    const updatedRoomService = await RoomService.findByIdAndUpdate(
      id,
      {
        ...roomService,
        modified_date: TIME_STAMP,
      },
      { new: true }
    );
    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);
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
    const TIME_STAMP = new Date();
    await RoomService.findOneAndRemove({ _id: id });
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Room Service deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
