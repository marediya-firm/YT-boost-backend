import { Router } from "express";
import { saveCampaign } from "../controllers/campaign.controller";
// import { createUser } from "../controllers/user.controller";

const router = Router();
router.post("/saveCampaign", saveCampaign);
export default router;
