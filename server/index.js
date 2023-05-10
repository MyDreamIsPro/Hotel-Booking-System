import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

import { existsSync, mkdirSync } from "fs";
// custom
import chatSocket from "./src/socket/chat.js";
import routes from "./src/routes/index.js";

// pre-config
dotenv.config();
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true, //access-control-allow-credentials:true
};
// express
const app = express();
const server = createServer(app);
const socketio = new Server(server, {
  cors: corsOptions,
});
// middlewares
app.use(express.json({ limit: "100mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("STATIC"));
// routes
app.use("/", routes);

// Pre-create required folder
if (!existsSync("BACKUP")) mkdirSync("BACKUP");

//Connect to DB
const PORT = process.env.PORT;
const CONNECTION_URL = "mongodb://127.0.0.1:27017/qq";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

global.mongo_to_socket = new Map();
chatSocket(socketio);
