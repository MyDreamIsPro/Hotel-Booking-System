import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { STRING } from "../constants/constants.js";

export const getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({ user: user, projectList: project });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Đã có lỗi xảy ra");
  }
};
export const login = async (req, res) => {
  const user = req.body;
  try {
    const existedUser = await User.findOne({
      username: user.username,
    });
    if (!existedUser)
      return res
        .status(200)
        .json({ error: true, message: "Sai tài khoản hoặc mật khẩu" });
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      existedUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(200)
        .json({ error: true, message: "Sai tài khoản hoặc mật khẩu" });

    //JWT
    const token = jwt.sign({ id: existedUser._id }, STRING.SECRET_KEY, {
      expiresIn: "3d",
    });
    res.status(202).json({ token: token, userId: existedUser._id });
  } catch (error) {
    console.log(error.message);
    res.status(409).send("Đã có lỗi xảy ra");
  }
};

export const signup = async (req, res) => {
  const user = req.body;
  try {
    const existedUsername = await User.findOne({ username: user.username });
    if (existedUsername) {
      return res
        .status(200)
        .json({ error: true, message: "Username đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User({
      ...user,
      password: hashedPassword,
    });
    await newUser.save();

    //JWT
    const token = jwt.sign({ id: newUser._id }, STRING.SECRET_KEY, {
      expiresIn: "3d",
    });
    return res.status(202).json({ token: token, userId: newUser._id });
  } catch (error) {
    console.log(error.message);
    res.status(409).send("Đã có lỗi xảy ra");
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.json({
      error: true,
      message: "Đăng nhập để thực hiện chức năng này",
    });
  }
  try {
    if (user.password === "") {
      await User.findByIdAndUpdate(
        _id,
        { full_name: user.full_name },
        {
          new: true,
        }
      );
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      await User.findByIdAndUpdate(
        _id,
        { full_name: user.full_name, password: hashedPassword },
        {
          new: true,
        }
      );
    }
    const returnedUser = await User.findOne({ _id: _id });
    res.status(202).json(returnedUser);
  } catch (error) {
    console.log(error.mesage);
    res.status(409).send("Đã có lỗi xảy ra");
  }
};
