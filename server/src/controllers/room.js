import mongoose from "mongoose";
import Room from "../models/room.js";
import RoomType from "../models/room_type.js";
import { INTEGER, STRING } from "../constants/constants.js";

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

export const holdRoom = async (req, res) => {
  const data = req.body;
  if (!mongoose.Types.ObjectId.isValid(data.hotel)) {
    return res.status(404).send("No hotel with that id");
  }
  try {
    const selectedRooms = data.selectedRooms.reduce((result, current) => {
      if (result[current["_id"]]) result[current["_id"]] += 1;
      else result[current["_id"]] = 1;
      return result;
    }, {});
    // Check if room quantity is enough
    const notEnoughRooms = [];
    for (let key in selectedRooms) {
      const requested_count = selectedRooms[key];
      const actual_count = await Room.countDocuments({
        $or: [
          { hotel: data.hotel, room_type: key, status: INTEGER.ROOM_EMPTY },
          {
            hotel: data.hotel,
            room_type: key,
            status: INTEGER.ROOM_PENDING,
            last_holding_time: { $lt: Date.now() },
          },
        ],
      });
      if (actual_count < requested_count) {
        //can not add key/value to a mongoose object
        //using lean() to disconnect object from mongoose
        const room_type = await RoomType.findOne(
          { _id: key },
          "name rent_bill"
        ).lean();
        room_type.requested_count = requested_count;
        room_type.actual_count = actual_count;
        notEnoughRooms.push(room_type);
      }
    }
    if (notEnoughRooms.length > 0) return res.status(409).json(notEnoughRooms);
    // Holding room
    const holdingRooms = [];
    for (let key in selectedRooms) {
      //get empty room to add holding time
      const roomList = await Room.find(
        {
          $or: [
            { hotel: data.hotel, room_type: key, status: INTEGER.ROOM_EMPTY },
            {
              hotel: data.hotel,
              room_type: key,
              status: INTEGER.ROOM_PENDING,
              last_holding_time: { $lt: Date.now() },
            },
          ],
        },
        "number"
      ).limit(selectedRooms[key]);
      //Add holding time
      for (let item of roomList) {
        await Room.findByIdAndUpdate(
          item._id,
          {
            status: INTEGER.ROOM_PENDING,
            last_holding_time: Date.now() + data.holding_time,
          }, // Holding in 10 minutes
          { new: true }
        );
        holdingRooms.push(item._id);
      }
    }
    res.status(202).json(holdingRooms);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
