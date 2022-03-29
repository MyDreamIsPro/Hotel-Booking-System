import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { STRING } from "../constants/constants.js";

const generateToken = (_id) => {
  return jwt.sign({ id: _id }, STRING.SECRET_KEY, {
    expiresIn: "1d",
  });
};

export const login = async (req, res) => {
  const user = req.body;
  try {
    const existedUser = await User.findOne({
      username: user.username,
    });
    if (!existedUser)
      return res.status(401).send(STRING.WRONG_USERNAME_PASSWORD_ERROR_MESSAGE);
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      existedUser.password
    );
    if (!isPasswordCorrect)
      res.status(401).send(STRING.WRONG_USERNAME_PASSWORD_ERROR_MESSAGE);

    const token = generateToken(existedUser._id);
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true,
        secure: false,
      })
      .json({ _id: existedUser._id, full_name: existedUser.full_name });
  } catch (error) {
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const signup = async (req, res) => {
  const user = req.body;
  try {
    const existedUsername = await User.findOne({ username: user.username });
    if (existedUsername) {
      return res.status(409).send(STRING.USERNAME_EXIST_ERROR_MESSAGE);
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User({
      ...user,
      password: hashedPassword,
    });
    await newUser.save();

    // JWT
    const token = generateToken(newUser._id);
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true,
        secure: false,
      })
      .json({ _id: newUser._id, full_name: newUser.full_name });
  } catch (error) {
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const logout = async (req, res) => {
  console.log(req.body);
  res.status(200).clearCookie("token").send("Logout completely");
};

export const ping = async (req, res) => {
  console.log(req.cookies);
  try {
    return res.status(202).send("OKE YOU GOT SECRET");
  } catch (error) {
    res.status(500).send("ERROR");
  }
};
