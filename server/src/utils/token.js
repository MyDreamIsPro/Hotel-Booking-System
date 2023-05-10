import dotenv from "dotenv";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refresh_token.js";
import { INTEGER } from "../constants/constants.js";

dotenv.config();

export const revokeRefreshToken = async (token) => {
  await RefreshToken.findOneAndUpdate(
    { token: token },
    { revoked: true, updated_date: new Date() }
  );
};

export const generateRefreshToken = async (user_id) => {
  const issued_date = new Date();
  const token = crypto.randomBytes(16).toString("hex");
  const TIMESTAMP = new Date();
  const newRecord = new RefreshToken({
    user: user_id,
    token: token,
    issued_date: issued_date,
    expiration: new Date(
      issued_date.getTime() + INTEGER.REFRESH_TOKEN_EXPIRATION
    ),
    created_date: TIMESTAMP,
    updated_date: TIMESTAMP,
  });
  await newRecord.save();
  return token;
};

export const generateAccessToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: INTEGER.ACCESS_TOKEN_EXPIRATION_TIME,
  });
};
