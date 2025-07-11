import { Request, Response } from "express";
import { CampaignMainModel } from "../model/campaign.model";
import {
  attachUserIdInQuery,
  attachUserIdInPayload,
  basStatusSend,
  successResponseSend,
  resolveDateParam,
  getCountryFromIP,
} from "../common";
import { WatchedVideo } from "../model/watch.video.model";

export const saveCampaign = async (req: Request, res: Response) => {
  const payload = attachUserIdInPayload(req);

  /**
   * Saving user video campaign
   */
  try {
    // const userId = payload.userId;

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

function getClientIP(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    typeof forwarded === "string"
      ? forwarded.split(",")[0]
      : req.socket.remoteAddress;

  // Normalize local dev IP
  if (ip === "::1" || ip === "127.0.0.1") {
    return "8.8.8.8"; // Google's IP for test location
  }

  return ip || "";
}

export const getUserUploadedCampaign = async (req: Request, res: Response) => {
  const ipInfo = getClientIP(req);
  const locationInfo = getCountryFromIP(ipInfo);
  console.log(
    "locationInfo",
    locationInfo,
    // req.ip || req.headers["x-forwarded-for"]
  );

  /**
   * Saving user video campaign
   */
  try {
    const payload = attachUserIdInQuery(req) as {
      date?: string;
      userId: string;
    };

    const userId = payload.userId;
    const date = resolveDateParam(payload?.date);

    const getResponseFromDB = await CampaignMainModel.find({
      userId,
      createdAt: {
        $lt: date,
      },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    successResponseSend(res, getResponseFromDB);
  } catch (error) {
    basStatusSend(res, {
      message: "Internal server error",
    });
  }
};

export const getCampaign = async (req: Request, res: Response) => {
  const locationInfo = getCountryFromIP(
    req.ip || (req.headers["x-forwarded-for"] as string)
  );
  console.log("locationInfo", locationInfo);

  /**
   * Saving user video campaign
   */
  try {
    const payload = attachUserIdInQuery(req) as {
      date?: string;
      userId: string;
    };

    const userId = payload.userId;
    const date = resolveDateParam(payload?.date);

    const getResponseFromDB = await CampaignMainModel.find({
      userId: { $ne: userId },
      createdAt: {
        $lt: date,
      },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    successResponseSend(res, getResponseFromDB);
  } catch (error) {
    basStatusSend(res, {
      message: "Internal server error",
    });
  }
};

export const markVideoAsWatched = async (req: Request, res: Response) => {
  const payload = attachUserIdInPayload(req);
  const userId = payload.userId;
  await WatchedVideo.updateOne(
    { userId },
    {
      $setOnInsert: {
        ipAddress: req.ip || req.headers["x-forwarded-for"], // Use trusted proxy headers if behind a proxy
      },
    },
    { upsert: true }
  );
};

/**
 * console.log("✅ Connected to MongoDB");

  const baseTime = new Date("2025-07-10T06:00:00.000Z");
  const userId1 = new mongoose.Types.ObjectId("686e3bdfbb57efb3c03837cd");
  const userId2 = new mongoose.Types.ObjectId("686e4c9fbb57efb3c03837ce");
  const videoIds = ["qdhHwRqmcw8", "abc123xyz", "vid908xy", "introAI21"];

  const campaigns = Array.from({ length: 50 }).map((_, i) => {
    const createdAt = new Date(baseTime.getTime() + i * 15000); // +15s
    return {
      userId: i % 2 === 0 ? userId1 : userId2,
      videoId: videoIds[i % videoIds.length],
      title: `Sample Video ${i + 1}`,
      author_name: "Sample Author",
      author_url: "https://www.youtube.com/@SampleAuthor",
      thumbnail_url: "https://i.ytimg.com/vi/qdhHwRqmcw8/hqdefault.jpg",
      type: "video",
      views: Math.floor(Math.random() * 1000),
      watch: 0,
      duration: 30 + (i % 5) * 30,
      createdAt,
      updatedAt: createdAt,
    };
  });
  console.log("campaigns", campaigns);
  await CampaignMainModel.insertMany(campaigns);
 * 
 * 
 */
