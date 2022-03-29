// lib
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
// custom
import userRoutes from "./routes/user.js";

// pre-config
dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
};
// express
const app = express();
// middleware
app.use(express.json({ limit: "100mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
// routes
app.use("/user", userRoutes);

//Connect to DB
const PORT = process.env.PORT;
const CONNECTION_URL = "mongodb://127.0.0.1:27017/qq";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
