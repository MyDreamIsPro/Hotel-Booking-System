import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import RoomType from "../models/room_type.js";
import { existsSync, unlinkSync } from "fs";
import { STRING } from "../constants/constants.js";

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

export const getAllHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find();
    setTimeout(() => {
      return res.status(200).json(hotel);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createHotel = async (req, res) => {
  const hotel = req.body;
  try {
    const newHotel = new Hotel({
      ...hotel,
      city: Number(hotel.fake),
      size: Number(hotel.size),
      numberOfRooms: Number(hotel.numberOfRooms),
    });
    await newHotel.save();
    return res.status(200).json(newHotel);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No hotel with that id");
  }
  try {
    const deletedHotel = await Hotel.findOneAndRemove({ _id: id });
    deleteImages(deletedHotel.images);
    res.status(202).send("Hotel deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const hotel = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No hotel with that id");
  }
  try {
    deleteImages(hotel.deleted_images);
    let new_images = [];
    if (hotel.current_images) {
      if (hotel.current_images instanceof Array) {
        new_images = [...hotel.current_images];
      } else {
        new_images.push(hotel.current_images);
      }
    }

    if (hotel.images) {
      if (hotel.images instanceof Array) {
        new_images = [...new_images, ...hotel.images];
      } else {
        new_images.push(hotel.images);
      }
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        ...hotel,
        images: new_images,
        city: Number(hotel.fake),
        size: Number(hotel.size),
        numberOfRooms: Number(hotel.numberOfRooms),
      },
      { new: true }
    );
    res.status(202).json(updatedHotel);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getHotelByFilter = async (req, res) => {
  const filter = req.body;
  try {
    const hotelList = await Hotel.find({ city: filter.fake }).lean();
    for (let hotel of hotelList) {
      //if the value inside sort is 1, it returns in ascending order
      //if the value inside sort is -1, it returns in descending order
      const roomType = await RoomType.find({ hotel: hotel._id }, "rent_bill")
        .sort({ rent_bill: 1 })
        .limit(1);
      hotel.min_price = roomType[0].rent_bill;
    }
    setTimeout(() => {
      return res.status(200).json(hotelList);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findOne({ _id: id });
    setTimeout(() => {
      return res.status(200).json(hotel);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAllHotelForForm = async (req, res) => {
  try {
    const hotel = await Hotel.find({}, "_id name");
    setTimeout(() => {
      return res.status(200).json(hotel);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
