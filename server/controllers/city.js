import mongoose from "mongoose";
import City from "../models/City.js";

export const getAll = async (req, res) => {
  try {
    const city = await City.find();
    if (city.length === 0) return res.status(200).send("Have no city yet");
    res.status(200).json(city);
  } catch (error) {
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
