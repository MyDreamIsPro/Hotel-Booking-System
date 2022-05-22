import User from "../models/User.js";
import Booking from "../models/booking.js";
import Room from "../models/room.js";
import RoomType from "../models/room_type.js";
import { STRING, INTEGER } from "../constants/constants.js";
import { formatDateWithHour } from "../utils/date.js";

import path from "path";

export const test = async (req, res) => {
  try {
    res.status(200).send("You're authenticated");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const backup = async (req, res) => {
  try {
    const backupFolderName = Date.now().toString();
    const databasePath = path.join("BACKUP", backupFolderName, "database");
    const imagePath = path.join("BACKUP", backupFolderName, "images");
    if (!existsSync(databasePath)) mkdirSync(databasePath, { recursive: true });

    if (!existsSync(imagePath)) mkdirSync(imagePath, { recursive: true });

    exec(
      `mongodump --db=qq --excludeCollection=backups -o  ${databasePath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log("ERR: ", err);
          return res.status(409).send("Something went wrong");
        }
        if (stderr) {
          // console.log("STDERR");
        }
        const originalImagePath = "static";
        cpSync(originalImagePath, imagePath, { recursive: true });
        const backup = new Backup({ name: backupFolderName });
        backup.save().then(() => res.status(202).send("BACKUP COMPLETED"));
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const restore = async (req, res) => {
  try {
    const databasePath = path.join("BACKUP", "1652940983089", "database");
    const imagePath = path.join("BACKUP", "1652940983089", "images");
    if (!existsSync(databasePath)) {
      return res.status(409).send("Not found");
    }
    exec(`mongorestore --verbose ${databasePath}`, (err, stdout, stderr) => {
      if (err) {
        console.log("ERR: ", err);
        return res.status(409).json({ message: "Something went wrong" });
      }
      if (stderr) {
        console.log("STDERR");
      }
      // remove all files and sub-directories first
      const originalImagePath = "static";
      if (existsSync(originalImagePath)) {
        rmSync(originalImagePath, { recursive: true });
      } else {
        mkdirSync(originalImagePath, { recursive: true });
      }
      cpSync(imagePath, originalImagePath, { recursive: true });
      res.status(202).send("RESTORE COMPLETED");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
