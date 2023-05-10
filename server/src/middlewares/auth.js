import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import RefreshToken from "../models/refresh_token.js";
import { generateAccessToken } from "../utils/token.js";
import { INTEGER, STRING } from "../constants/constants.js";

dotenv.config();

export const userAuthMiddleware = async (req, res, next) => {
  try {
    if (req.cookies.customer === undefined)
      return res.status(401).send(STRING.AUTHENTICATION_FAILED);
    const token = req.cookies.customer;
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req._id = decodedData.id;
    const user = await User.findOne({ _id: decodedData.id });
    if (user) next();
    else return res.status(401).send(STRING.AUTHENTICATION_FAILED);
  } catch (error) {
    console.log("middleware: ", error.message);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const adminAuthMiddleware = async (req, res, next) => {
  let refresh_token_record;
  try {
    const refresh_token = req.cookies.admin_refresh_token;

    // Validate refresh token
    if (!refresh_token) {
      return res
        .clearCookie("admin_access_token")
        .clearCookie("admin_refresh_token")
        .status(401)
        .send(STRING.AUTHENTICATION_FAILED);
    }

    refresh_token_record = await RefreshToken.findOne({
      token: refresh_token,
    }).populate("user");
    if (!refresh_token_record) {
      return res
        .clearCookie("admin_access_token")
        .clearCookie("admin_refresh_token")
        .status(401)
        .send(STRING.AUTHENTICATION_FAILED);
    }

    const currentDate = new Date().getTime();
    const tokenExpiration = new Date(refresh_token_record.expiration).getTime();
    if (refresh_token_record.revoked || currentDate >= tokenExpiration) {
      return res
        .clearCookie("admin_access_token")
        .clearCookie("admin_refresh_token")
        .status(401)
        .send(STRING.AUTHENTICATION_FAILED);
    }

    // Validate access token
    const access_token = req.cookies.admin_access_token;
    const decodedData = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    req._id = decodedData.id;
    const user = await User.findOne({ _id: decodedData.id });
    req.full_name = user?.full_name;

    if (
      user &&
      (user.role === INTEGER.ADMIN_ROLE || user.role === INTEGER.EMPLOYEE_ROLE)
    )
      next();
    else return res.status(401).send(STRING.AUTHENTICATION_FAILED);
  } catch (error) {
    // Regenerate access token
    console.log(error);
    if (error.name && refresh_token_record) {
      const new_access_token = generateAccessToken(
        refresh_token_record.user._id
      );

      req._id = refresh_token_record.user.id;
      req.full_name = refresh_token_record.user.full_name;

      const cookies_expiration = new Date(
        Date.now() + INTEGER.COOKIES_EXPIRATION_TIME
      );
      res.cookie("admin_access_token", new_access_token, {
        expires: cookies_expiration,
        httpOnly: true,
        secure: false,
      });
      next();
    } else {
      return res.status(401).send(STRING.AUTHENTICATION_FAILED);
    }
  }
};
