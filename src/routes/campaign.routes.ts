import { Router } from "express";
import { getCampaign, saveCampaign } from "../controllers/campaign.controller";
// import { createUser } from "../controllers/user.controller";

const router = Router();
router.post("/saveCampaign", saveCampaign).get("/getCampaign", getCampaign);
export default router;
