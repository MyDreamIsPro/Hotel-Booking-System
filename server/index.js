import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// import userRoutes from "./routes/user.js";

const app = express();
//Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());
// app.use("/user", userRoutes);

//Connect to DB
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb://127.0.0.1:27017/tuanvq";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
