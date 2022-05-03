import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/user");
  },
  filename: (req, file, cb) => {
    const fileName = req.body._id + path.extname(file.originalname);
    req.body.profile_image = "http://localhost:5000/user/" + fileName;
    cb(null, fileName);
  },
});

const hotelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/hotel");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    if (!(req.body.images instanceof Array)) req.body.images = [];
    req.body.images.push("http://localhost:5000/hotel/" + fileName);
    cb(null, fileName);
  },
});

export const uploader = multer({ storage: storage });
export const hotelUploader = multer({ storage: hotelStorage });
