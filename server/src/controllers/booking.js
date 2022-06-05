import mongoose from "mongoose";
import Discount from "../models/discount.js";
import Booking from "../models/booking.js";
import UserUseDiscount from "../models/user_use_discount.js";
import Room from "../models/room.js";
import Log from "../models/log.js";
import { INTEGER, STRING } from "../constants/constants.js";
// For vnpay
import dateFormat from "dateformat";
import querystring from "qs";
import crypto from "crypto";
// VNPAY
const TMN_CODE = "E1OG5FT2";
const HASH_SECRET = "ILAGUEUHBAOMDROPQRCTNMUPHDMBOUCK";
const VNP_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const RETURN_URL = "http://localhost:3001/payment-return";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Đơn đặt chỗ",
    time_stamp: time,
  });
  await newLog.save();
};

export const createBooking = async (req, res) => {
  const booking = req.body;
  try {
    const TIME_STAMP = new Date();
    const maxBookingNumber = await Booking.find()
      .sort({ number: -1 })
      .limit(1)
      .then((data) => (data[0] ? data[0].number : 0));

    // HANDLE DISCOUNT
    if (booking.discount) {
      await Discount.updateOne(
        { _id: booking.discount },
        {
          $inc: { quantity: -1 },
        }
      );
    }
    // MARK USER USED DISCOUNT
    const userUseDiscount = new UserUseDiscount({
      discount: booking.discount,
      user: req._id,
      created_date: TIME_STAMP,
    });
    await userUseDiscount.save();

    const newBooking = new Booking({
      ...booking,
      user: req._id,
      number: maxBookingNumber + 1,
      effective_from: new Date(booking.effective_from),
      effective_to: new Date(booking.effective_to),
      payment_date: new Date(booking.payment_date),
      created_date: TIME_STAMP,
    });
    // Change room status to FILLED
    await Room.updateMany(
      { _id: { $in: booking.room_list } },
      { $set: { status: INTEGER.ROOM_RENTED } }
    );
    // Save booking
    await newBooking.save();
    await logAction(req._id, INTEGER.LOG_BOOK_BOOKING, TIME_STAMP);
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
  const userId = req._id;
  try {
    const bookingList = await Booking.find({ user: userId })
      .populate("hotel", ["name", "images"])
      .sort({ created_date: -1 });
    setTimeout(() => {
      return res.status(200).json(bookingList);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createPaymentUrl = async (req, res) => {
  const transaction = req.body;
  try {
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = TMN_CODE;
    var secretKey = HASH_SECRET;
    var vnpUrl = VNP_URL;
    var returnUrl = RETURN_URL;

    var date = new Date();

    var createDate = dateFormat(date, "yyyymmddHHmmss");
    var orderId = dateFormat(date, "HHmmss");

    var orderInfo =
      "Thanh toan don hang tren tuanvu coto hotel thoi gian: " +
      dateFormat(date, "yyyy-mm-dd HH:mm:ss");
    var orderType = "170000";
    var locale = "vn";
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = transaction.amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_BankCode"] = transaction.bank;

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    setTimeout(() => {
      return res.status(200).send(vnpUrl);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const checkPaymentReturn = async (req, res) => {
  const data = req.body;
  try {
    const booking = data.booking;
    // DOING
    var vnp_Params = data.vnp_params;
    booking["payment_method"] = `VNPAY - ${vnp_Params["vnp_BankCode"]}`;

    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", HASH_SECRET);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    // DOING
    const PAYMENT_RESULT =
      secureHash === signed && vnp_Params["vnp_ResponseCode"] === "00"
        ? "SUCCESS"
        : "FAIL";

    // PAYMENT SUCCESSFUL
    if (PAYMENT_RESULT === "SUCCESS") {
      const TIME_STAMP = new Date();
      const maxBookingNumber = await Booking.find()
        .sort({ number: -1 })
        .limit(1)
        .then((data) => (data[0] ? data[0].number : 0));
      // HANDLE DISCOUNT
      if (booking.discount) {
        await Discount.updateOne(
          { _id: booking.discount },
          {
            $inc: { quantity: -1 },
          }
        );
      }
      // MARK USER USED DISCOUNT
      const userUseDiscount = new UserUseDiscount({
        discount: booking.discount,
        user: booking.user,
        created_date: TIME_STAMP,
      });
      await userUseDiscount.save();

      const newBooking = new Booking({
        ...booking,
        number: maxBookingNumber + 1,
        effective_from: new Date(booking.effective_from),
        effective_to: new Date(booking.effective_to),
        payment_date: new Date(booking.payment_date),
        created_date: TIME_STAMP,
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
      await logAction(booking.user, INTEGER.LOG_BOOK_BOOKING, TIME_STAMP);
    } else {
      // PAYMENT FAILURE
      await Room.updateMany(
        { _id: { $in: booking.room_list } },
        { $set: { status: INTEGER.ROOM_EMPTY } }
      );
    }

    setTimeout(() => {
      res.status(200).send(PAYMENT_RESULT);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const cancelBookingByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const TIME_STAMP = new Date();
    const booking = await Booking.findOne({ _id: id });
    if (!booking) return res.status(404).send(STRING.BOOKING_NOT_FOUND);

    const cancelledBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status: INTEGER.BOOKING_CANCELED,
        modified_date: TIME_STAMP,
      },
      { new: true }
    ).populate("hotel", ["_id", "name", "images"]);

    if (cancelledBooking.discount) {
      await Discount.updateOne(
        { _id: cancelledBooking.discount },
        {
          $inc: { quantity: 1 },
        }
      );

      // REMOVE USER FROM USING THE DISCOUNT
      await UserUseDiscount.deleteOne({
        discount: cancelledBooking.discount,
        user: req._id,
      });
    }

    await Room.updateMany(
      { _id: { $in: cancelledBooking.room_list } },
      { status: INTEGER.ROOM_EMPTY }
    );
    await logAction(req._id, INTEGER.LOG_CANCEL_BOOKING, TIME_STAMP);
    res.status(200).json(cancelledBooking);
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
      .populate("user", ["_id", "full_name", "phone"])
      .populate("discount", ["code", "title", "type", "value"])
      .populate({ path: "combo_list", select: ["name", "amount"] })
      // NESTED POPULATION IN MONGOOSE
      .populate({
        path: "room_list",
        select: "number",
        populate: {
          path: "room_type",
          model: "RoomType",
          select: "name rent_bill",
        },
      })
      .sort({ created_date: -1 });
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
    const TIME_STAMP = new Date();
    const booking = await Booking.findOne({ _id: id });
    if (!booking) return res.status(404).send(STRING.BOOKING_NOT_FOUND);

    const cancelledBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status: INTEGER.BOOKING_CANCELED,
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("hotel", ["_id", "name"])
      .populate("user", ["_id", "full_name", "phone"])
      .populate("discount", ["code", "title", "type", "value"])
      .populate({ path: "combo_list", select: ["name", "amount"] })
      // NESTED POPULATION IN MONGOOSE
      .populate({
        path: "room_list",
        select: "number",
        populate: {
          path: "room_type",
          model: "RoomType",
          select: "name rent_bill",
        },
      });

    if (cancelledBooking.discount) {
      await Discount.updateOne(
        { _id: cancelledBooking.discount },
        {
          $inc: { quantity: 1 },
        }
      );
      // REMOVE USER FROM USING THE DISCOUNT
      await UserUseDiscount.deleteOne({
        discount: cancelledBooking.discount,
        user: cancelledBooking.user,
      });
    }
    await Room.updateMany(
      { _id: { $in: cancelledBooking.room_list } },
      { status: INTEGER.ROOM_EMPTY }
    );
    await logAction(req._id, INTEGER.LOG_CANCEL_BOOKING, TIME_STAMP);
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
    const TIME_STAMP = new Date();
    const checkedInBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status: INTEGER.BOOKING_CHECK_IN,
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("hotel", ["_id", "name"])
      .populate("user", ["_id", "full_name", "phone"])
      .populate("discount", ["code", "title", "type", "value"])
      .populate({ path: "combo_list", select: ["name", "amount"] })
      // NESTED POPULATION IN MONGOOSE
      .populate({
        path: "room_list",
        select: "number",
        populate: {
          path: "room_type",
          model: "RoomType",
          select: "name rent_bill",
        },
      });

    await logAction(req._id, INTEGER.LOG_CHECK_IN_BOOKING, TIME_STAMP);
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
    const TIME_STAMP = new Date();
    const checkedOutBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status: INTEGER.BOOKING_CHECK_OUT,
        modified_date: TIME_STAMP,
      },
      { new: true }
    )
      .populate("hotel", ["_id", "name"])
      .populate("user", ["_id", "full_name", "phone"])
      .populate("discount", ["code", "title", "type", "value"])
      .populate({ path: "combo_list", select: ["name", "amount"] })
      // NESTED POPULATION IN MONGOOSE
      .populate({
        path: "room_list",
        select: "number",
        populate: {
          path: "room_type",
          model: "RoomType",
          select: "name rent_bill",
        },
      });

    await Room.updateMany(
      { _id: { $in: checkedOutBooking.room_list } },
      { status: INTEGER.ROOM_EMPTY }
    );
    await logAction(req._id, INTEGER.LOG_CHECK_OUT_BOOKING, TIME_STAMP);
    res.status(200).json(checkedOutBooking);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
// utils
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
