import { Router } from "express";
import {
  getCampaign,
  getUserUploadedCampaign,
  saveCampaign,
} from "../controllers/campaign.controller";

const router = Router();
router
  .post("/saveCampaign", saveCampaign)
  .get("/getUserUploadedCampaign", getUserUploadedCampaign)
  .post("/getCampaign", getCampaign);
export default router;
