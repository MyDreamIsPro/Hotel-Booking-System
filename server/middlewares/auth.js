import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";
import { STRING } from "../constants/constants.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  console.log(req.headers.cookie);
  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   const isCustomAuth = token.length < 500; //Check the token from google or this server
  //   let decodedData;
  //   if (isCustomAuth) {
  //     //Server token
  //     decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  //     req.userId = decodedData.id;
  //     const user = await User.findOne({ _id: req.userId });
  //     if (user) next();
  //     //If user exists then call the next middleware
  //     else
  //       res.json({
  //         error: true,
  //         message: "Đăng nhập để thực hiện thao tác này",
  //       }); //return error
  //   } else {
  //     //Google token (future feature)
  //     decodedData = jwt.decode(token);
  //     req.userId = decodedData?.id;
  //   }
  //   // res.json({error: true, message: "Đã có lỗi xảy ra"});
  // } catch (error) {
  //   console.log("middleware: ", error.message);
  //   res.status(409).send("Đã có lỗi xảy ra");
  // }
};
