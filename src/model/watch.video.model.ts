// watchedVideo.model.ts

import mongoose from "mongoose";

export const WatchedVideoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt (used as watchedAt), updatedAt
    versionKey: false,
  }
);

// Prevent duplicate watch entries
WatchedVideoSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const WatchedVideo = mongoose.model("watched_video", WatchedVideoSchema);
