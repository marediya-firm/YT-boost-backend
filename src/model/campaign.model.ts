import mongoose from "mongoose";

const CampaignMainSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author_name: {
      type: String,
      required: true,
    },
    author_url: {
      type: String,
      required: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["video"],
      default: "video",
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Combined Unique Index
CampaignMainSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const CampaignMainModel = mongoose.model(
  "campaign_main",
  CampaignMainSchema
);
