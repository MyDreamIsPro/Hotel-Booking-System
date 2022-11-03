import mongoose from "mongoose";
import Event from "../models/event.js";
import Log from "../models/log.js";
import { INTEGER, STRING } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Sự kiện",
    time_stamp: time,
  });
  await newLog.save();
};

export const createEvent = async (req, res) => {
  const event = req.body;
  try {
    const TIME_STAMP = new Date();
    const new_event = new Event({
      ...event,
      user: req._id,
      created_date: TIME_STAMP,
    });
    await new_event.save();
    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
    const returned_data = {
      title: new_event.title,
      start: new_event.start_date,
      end: new_event.end_date,
      backgroundColor: new_event.color,
      textColor: "#FFF",
      borderColor: new_event.color,
      allDay: new_event.is_all_day,
      extendedProps: {
        description: new_event.description,
        _id: new_event._id,
      },
    };
    res.status(202).json(returned_data);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getAllEventByUser = async (req, res) => {
  try {
    const events = await Event.find({ user: req._id }).lean();
    const returned_data = events.map((item) => {
      return {
        title: item.title,
        start: item.start_date,
        end: item.end_date,
        backgroundColor: item.color,
        textColor: "#FFF",
        borderColor: item.color,
        allDay: item.is_all_day,
        extendedProps: {
          description: item.description,
          _id: item._id,
        },
      };
    });
    // setTimeout(() => {
    res.status(202).send(returned_data);
    // }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No event with that id");
  }
  const event = req.body;
  try {
    const TIME_STAMP = new Date();
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        ...event,
        modified_date: TIME_STAMP,
      },
      { new: true }
    );
    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);
    const returned_data = {
      title: updatedEvent.title,
      start: updatedEvent.start_date,
      end: updatedEvent.end_date,
      backgroundColor: updatedEvent.color,
      textColor: "#FFF",
      borderColor: updatedEvent.color,
      allDay: updatedEvent.is_all_day,
      extendedProps: {
        description: updatedEvent.description,
        _id: updatedEvent._id,
      },
    };
    res.status(202).json(returned_data);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No event with that id");
  }
  try {
    const TIME_STAMP = new Date();
    await Event.findOneAndRemove({ _id: id });
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Event deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
