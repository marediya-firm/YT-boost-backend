import express from "express";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
const mongoConnection = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017", {
    autoIndex: true,
    appName: "YT-Boost-Backend",
  });
};
mongoConnection()
  .then((res) => {
    console.log("res", res);
  })
  .catch((error) => {
    console.log("res", error);
  });
app.use(express.json());
app.use("/api/users", userRoutes);

export default app;
