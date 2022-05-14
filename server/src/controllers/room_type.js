import mongoose from "mongoose";
import { existsSync, unlinkSync } from "fs";
import RoomType from "../models/room_type.js";
import Room from "../models/room.js";
import { STRING, INTEGER } from "../constants/constants.js";

const deleteImages = (images) => {
  if (images) {
    if (images instanceof Array) {
      const deletedImage = images.map((item) => "./static/" + item.slice(22));
      deletedImage.forEach((image) => existsSync(image) && unlinkSync(image));
    } else {
      const linkToDelete = "./static/" + images.slice(22);
      if (existsSync(linkToDelete)) unlinkSync(linkToDelete);
    }
  }
};

export const getAllRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.find()
      .populate("hotel", ["_id", "name"])
      .populate("services", ["_id", "name"]);
    setTimeout(() => {
      return res.status(200).json(roomType);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getRoomTypeByHotel = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No hotel with that id");
  }
  try {
    const roomType = await RoomType.find({ hotel: id }, "_id name");
    setTimeout(() => {
      return res.status(200).json(roomType);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createRoomType = async (req, res) => {
  const roomType = req.body;
  try {
    const newRoomType = new RoomType({
      ...roomType,
      rent_bill: Number(roomType.rent_bill),
      size: Number(roomType.size),
      bed_number: Number(roomType.bed_number),
      big_bed_number: Number(roomType.big_bed_number),
      adult: Number(roomType.adult),
      kid: Number(roomType.kid),
    });
    await newRoomType.save();
    return res.status(200).json(newRoomType);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_TYPE_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateRoomType = async (req, res) => {
  const { id } = req.params;
  const roomType = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room_type with that id");
  }
  try {
    let new_images = [];
    if (roomType.current_images) {
      if (roomType.current_images instanceof Array) {
        new_images = [...roomType.current_images];
      } else {
        new_images.push(roomType.current_images);
      }
    }

    if (roomType.images) {
      if (roomType.images instanceof Array) {
        new_images = [...new_images, ...roomType.images];
      } else {
        new_images.push(roomType.images);
      }
    }

    const updatedRoomType = await RoomType.findByIdAndUpdate(
      id,
      {
        ...roomType,
        images: new_images,
        rent_bill: Number(roomType.rent_bill),
        size: Number(roomType.size),
        bed_number: Number(roomType.bed_number),
        big_bed_number: Number(roomType.big_bed_number),
        adult: Number(roomType.adult),
        kid: Number(roomType.kid),
      },
      { new: true }
    );

    deleteImages(roomType.deleted_images);

    res.status(202).json(updatedRoomType);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_TYPE_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteRoomType = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No room_service with that id");
  }
  try {
    const deletedRoomType = await RoomType.findOneAndRemove({ _id: id });
    deleteImages(deletedRoomType.images);
    res.status(202).send("Room Service deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAvailableRoomType = async (req, res) => {
  const { hotel_id } = req.params;
  const filter = req.body;
  if (!mongoose.Types.ObjectId.isValid(hotel_id)) {
    return res.status(404).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
  try {
    const available_list = await Room.distinct("room_type", {
      $or: [
        {
          hotel: hotel_id,
          status: INTEGER.ROOM_EMPTY,
        },
        {
          hotel: hotel_id,
          status: INTEGER.ROOM_PENDING,
          last_holding_time: { $lt: Date.now() },
        },
      ],
    }); // select all room_type is available to book
    // if (available_list.length === 0) return res.status(202).json([]);
    const room_type = await RoomType.find({
      adult: { $gte: filter.adult },
      kid: { $gte: filter.kid },
    })
      .where("_id")
      .in(available_list)
      .populate("services", ["icon", "name"]); // select all room_type data from available _id list
    setTimeout(() => {
      res.status(202).json(room_type);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
