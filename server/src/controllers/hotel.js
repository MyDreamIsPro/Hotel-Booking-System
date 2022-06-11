import mongoose from "mongoose";
import Hotel from "../models/hotel.js";
import Combo from "../models/combo.js";
import Log from "../models/log.js";
import Room from "../models/room.js";
import RoomType from "../models/room_type.js";
import Booking from "../models/booking.js";
import Review from "../models/review.js";
import PeakDay from "../models/peak_day.js";
import { existsSync, unlinkSync } from "fs";
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

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Khách sạn",
    time_stamp: time,
  });
  await newLog.save();
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
    const TIME_STAMP = new Date();
    const newHotel = new Hotel({
      ...hotel,
      city: Number(hotel.fake),
      size: Number(hotel.size),
      numberOfRooms: Number(hotel.numberOfRooms),
      created_date: TIME_STAMP,
    });
    await newHotel.save();
    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
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
    const TIME_STAMP = new Date();
    const deletedHotel = await Hotel.findOneAndRemove({ _id: id });
    deleteImages(deletedHotel.images);
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Hotel deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No hotel with that id");
  }
  const hotel = req.body;
  try {
    const TIME_STAMP = new Date();
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
        modified_date: TIME_STAMP,
      },
      { new: true }
    );
    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);
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
    const returnedList = [];
    let bookingList;
    for (let hotel of hotelList) {
      const existRoom = await Room.findOne({ hotel: hotel._id });
      if (!existRoom) continue;
      //if the value inside sort is 1, it returns in ascending order
      //if the value inside sort is -1, it returns in descending order
      // CALCULATE THE MIN PRICE
      const roomType = await RoomType.find({ hotel: hotel._id }, "rent_bill")
        .sort({ rent_bill: 1 })
        .limit(1);
      hotel.min_price = roomType[0]?.rent_bill || 0;
      // CALCULATE THE RATING SCORE
      bookingList = await Booking.find({ hotel: hotel._id }, "_id").lean();
      bookingList = bookingList.map((item) => item._id);

      const result = await Review.aggregate([
        {
          $match: {
            booking: { $in: bookingList },
            status: { $eq: INTEGER.REVIEW_ACCEPTED },
          },
        },
        {
          $group: {
            _id: null,
            score: { $sum: "$overallScore" },
            count: { $sum: 1 },
          },
        },
      ]);
      if (result.length > 0) {
        // hotel.score = Math.ceil(result[0].score / result[0].count);
        hotel.score = result[0].score / result[0].count;
        hotel.count_review = result[0].count;
      } else {
        hotel.score = 0;
        hotel.count_review = 0;
      }
      // ADD COMPUTED ELEMENT
      returnedList.push(hotel);
    }
    setTimeout(() => {
      return res.status(200).json(returnedList);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findOne({ _id: id }).lean();
    // GET HOTEL'S COMBO
    const combo = await Combo.find({ hotel: id }, "name amount detail").sort({
      amount: 1,
    });
    hotel["combo"] = combo;
    // GET PEAK DAYS
    let peakDayList = await PeakDay.find({}, "start_date end_date")
      .sort({
        start_date: 1,
      })
      .lean();
    for (let range of peakDayList) {
      delete range["_id"];
      range["start_date"] = range["start_date"].getTime();
      range["end_date"] = range["end_date"].getTime();
    }
    hotel["peakDayList"] = peakDayList;
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
