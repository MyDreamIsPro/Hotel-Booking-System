import mongoose from "mongoose";
import Booking from "../models/booking.js";
import Room from "../models/room.js";
import { INTEGER, STRING } from "../constants/constants.js";

export const createBooking = async (req, res) => {
  const booking = req.body;
  try {
    const newBooking = new Booking({
      ...booking,
      effective_from: new Date(booking.effective_from),
      effective_to: new Date(booking.effective_to),
      payment_date: new Date(booking.payment_date),
    });
    // Change room status to FILLED
    for (let room of booking.room_list) {
      await Room.findByIdAndUpdate(
        room,
        {
          status: INTEGER.ROOM_RENTED,
        },
        { new: true }
      );
    }
    // Save booking
    await newBooking.save();
    return res.status(200).send("ĐẶT PHÒNG THÀNH CÔNG");
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send(STRING.ROOM_ALREADY_EXIST);
    }
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAllBookingByUser = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(401).send(STRING.AUTHENTICATION_FAILED);
  try {
    const bookingList = await Booking.find({ user: userId }).populate("hotel", [
      "name",
      "images",
    ]);
    setTimeout(() => {
      return res.status(200).json(bookingList);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
