import { Request, Response } from "express";
import { CampaignMainModel } from "../model/campaign.model";
import {
  attachUserIdInPayload,
  basStatusSend,
  successResponseSend,
} from "../common";
// import moment from "moment";

export const saveCampaign = async (req: Request, res: Response) => {
  const payload = attachUserIdInPayload(req);

  /**
   * Saving user video campaign
   */
  try {
    const userId = payload.userId;

    // Get today's date range EX-formate: 2025-07-09T18:30:00.000Z
    // const startOfDay = moment().startOf("day").toDate();
    // const endOfDay = moment().endOf("day").toDate();
    // // Count existing campaigns for this user today
    // const todayCount = await CampaignMainModel.countDocuments({
    //   userId,
    //   createdAt: { $gte: startOfDay, $lte: endOfDay },
    // });
    // console.log("todayCount", todayCount);

    // if (todayCount >= 3) {
    //   res.status(400).json({
    //     message: "You can only create up to 3 campaigns per day.",
    //   });
    // }

    const saved = await CampaignMainModel.create(payload);
    successResponseSend(res, { message: "Campaign saved", data: saved });
  } catch (error: any) {
    if (error?.errorResponse?.code === 11000) {
      basStatusSend(
        res,
        {
          message: "This video already exists for the user",
        },
        409
      );
    }
    console.error("Error saving campaign:", error?.errors);
    basStatusSend(res, {
      message: "Internal server error",
    });
  }
};

export const getCampaign = async (req: Request, res: Response) => {
  const payload = attachUserIdInPayload(req);
  /**
   * Saving user video campaign
   */
  try {
    const userId = payload.userId;
    console.log("user id ", userId);
    console.log("getCampaign");

    const getResponseFromDB = await CampaignMainModel.find({
      userId,
      createdAt: { $lt: payload?.date || new Date() },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    console.log("getResponseFromDB", getResponseFromDB);

    successResponseSend(res, getResponseFromDB);
  } catch (error) {
    console.log("getCampaign", error);
    basStatusSend(res, {
      message: "Internal server error",
    });
  }
};
