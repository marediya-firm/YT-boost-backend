import express from "express";
import userRoutes from "./routes/user.routes";
import campaignRoutes from "./routes/campaign.routes";
import cors from "cors";
import mongoose from "mongoose";
import { accessPermission } from "./common/Access";

const app = express();
app.use(express.json());
app.use(cors());

const mongoConnection = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017", {
    autoIndex: true,
    appName: "YT-Boost-Backend",
  });
};
mongoConnection();

app.use(accessPermission);
app.use("/api/users/auth", userRoutes);
app.use("/api/users/campaign", campaignRoutes);

export default app;
