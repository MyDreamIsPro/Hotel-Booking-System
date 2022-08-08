import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/user.js";

dotenv.config();

export const authMiddleware = async (socket, next) => {
  const error = new Error("ALO");
  error.data = 401;

  if (socket.request.headers.cookie === undefined) {
    next(error);
    return;
  }

  const cookies = cookie.parse(socket.request.headers.cookie);
  const ROLE = socket.request._query["role"];

  if (ROLE !== "admin" && ROLE !== "customer" && !cookies[ROLE]) {
    next(error);
    return;
  }

  const decoded_data = jwt.verify(
    cookies[ROLE],
    process.env.ACCESS_TOKEN_SECRET_KEY
  );

  let user = await User.findOne({ _id: decoded_data.id });

  if (!user) {
    next(error);
    return;
  }

  user = {
    _id: user._id.toString(),
    full_name: user.full_name,
    profile_image: user.profile_image,
  };
  global.contacts.set(user._id.toString(), user);
  socket.user = user;
  next();
};
