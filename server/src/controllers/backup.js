import mongoose from "mongoose";
import path from "path";
import { existsSync, mkdirSync, cpSync, rmSync, readdirSync } from "fs";
import { exec } from "child_process";

import Backup from "../models/backup.js";
import { STRING } from "../constants/constants.js";

export const getAllBackup = async (req, res) => {
  try {
    const backupList = await Backup.find();
    setTimeout(() => {
      res.status(200).json(backupList);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createBackup = async (req, res) => {
  const full_name = req.full_name;
  const data = req.body;
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
          return res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
        }
        if (stderr) {
          // console.log("STDERR");
        }
        const originalImagePath = "STATIC";
        cpSync(originalImagePath, imagePath, { recursive: true });
        const backup = new Backup({
          name: backupFolderName,
          user: full_name,
          detail: data.detail,
          last_using: new Date(),
          created_date: new Date(),
        });
        backup.save().then(() => {
          res.status(200).json(backup);
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateBackup = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Bản sao lưu không tồn tại trên hệ thống");
  }
  const backup = req.body;
  try {
    const updatedBackup = await Backup.findByIdAndUpdate(
      id,
      {
        detail: backup.detail,
      },
      { new: true }
    );
    res.status(202).json(updatedBackup);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const restore = async (req, res) => {
  const { id } = req.params;
  try {
    const backup = await Backup.findOne({ _id: id });
    if (!backup) {
      return res.status(404).send("Bản sao lưu không tồn tại trên hệ thống");
    }
    const databasePath = path.join("BACKUP", backup.name, "database");
    const imagePath = path.join("BACKUP", backup.name, "images");
    if (!existsSync(databasePath)) {
      return res.status(404).send("Bản sao lưu không tồn tại trên hệ thống");
    }
    // --drop option helps us to drop all collections before restoring
    // --drop option does not drop collections that are not in the backup
    exec(
      `mongorestore --verbose --drop ${databasePath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log("ERR: ", err);
          return res
            .status(500)
            .json({ message: STRING.UNEXPECTED_ERROR_MESSAGE });
        }
        if (stderr) {
          // console.log("STDERR");
        }
        // remove all files and sub-directories first
        const originalImagePath = "STATIC";
        if (existsSync(originalImagePath)) {
          rmSync(originalImagePath, { recursive: true });
        } else {
          mkdirSync(originalImagePath, { recursive: true });
        }
        cpSync(imagePath, originalImagePath, { recursive: true });
        Backup.findByIdAndUpdate(
          id,
          {
            last_using: new Date(),
          },
          { new: true },
          (err, docs) => {
            if (err)
              return res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);

            res.status(202).json(docs);
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteBackup = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBackup = await Backup.findOneAndRemove({ _id: id });
    const backupPath = path.join("BACKUP", deletedBackup.name);
    if (existsSync(backupPath)) rmSync(backupPath, { recursive: true });
    setTimeout(() => {
      res.status(200).send("Backup has been deleted");
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
