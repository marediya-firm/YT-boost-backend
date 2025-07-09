import { Request, Response } from "express";
import { CampaignMainModel } from "../model/campaign.model";
import {
  attachUserIdInPayload,
  basStatusSend,
  successResponseSend,
} from "../common";

export const saveCampaign = async (req: Request, res: Response) => {
  const payload = attachUserIdInPayload(req);

  try {
    const saved = await CampaignMainModel.create(payload);
    successResponseSend(res, { message: "Campaign saved", data: saved });
  } catch (error: any) {
    console.log("error", error?.errorResponse?.code);

    if (error?.errorResponse?.code === 11000) {
      return basStatusSend(
        res,
        {
          message: "This video already exists for the user",
        },
        200
      );
    }
    console.error("Error saving campaign:", error);
    return basStatusSend(res, {
      message: "Internal server error",
    });
  }
};
