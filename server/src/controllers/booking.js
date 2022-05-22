import mongoose from "mongoose";
import Booking from "../models/booking.js";
import Room from "../models/room.js";
import { INTEGER, STRING } from "../constants/constants.js";

export const createBooking = async (req, res) => {
  const booking = req.body;
  try {
    const maxBookingNumber = await Booking.find()
      .sort({ number: -1 })
      .limit(1)
      .then((data) => (data[0] ? data[0].number : 0));
    const newBooking = new Booking({
      ...booking,
      number: maxBookingNumber + 1,
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

// MANAGEMENT
export const getAllBookingForAdmin = async (req, res) => {
  try {
    const booking = await Booking.find()
      .populate("hotel", ["_id", "name"])
      .populate("user", ["_id", "full_name", "phone"]);
    setTimeout(() => {
      res.status(200).json(booking);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findOne({ _id: id });
    if (!booking) return res.status(404).send(STRING.BOOKING_NOT_FOUND);
    const cancelledBooking = await Booking.findByIdAndUpdate(id, {
      status: INTEGER.BOOKING_CANCELED,
      modified_date: new Date(),
    })
      .populate("hotel", ["name", "images"])
      .populate("user", ["_id", "full_name", "phone"]);
    await Room.updateMany(
      { _id: { $in: cancelledBooking.room_list } },
      { status: INTEGER.ROOM_EMPTY }
    );
    res.status(200).json(cancelledBooking);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const checkInBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(STRING.BOOKING_NOT_FOUND);
  try {
    const checkedInBooking = await Booking.findByIdAndUpdate(id, {
      status: INTEGER.BOOKING_CHECK_IN,
      modified_date: new Date(),
    })
      .populate("hotel", ["_id", "name"])
      .populate("user", ["_id", "full_name", "phone"]);
    res.status(200).json(checkedInBooking);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
export const checkOutBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(STRING.BOOKING_NOT_FOUND);
  try {
    const checkedOutBooking = await Booking.findByIdAndUpdate(id, {
      status: INTEGER.BOOKING_CHECK_OUT,
      modified_date: new Date(),
    })
      .populate("hotel", ["_id", "name"])
      .populate("user", ["_id", "full_name", "phone"]);

    await Room.updateMany(
      { _id: { $in: checkedOutBooking.room_list } },
      { status: INTEGER.ROOM_EMPTY }
    );
    res.status(200).json(checkedOutBooking);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
