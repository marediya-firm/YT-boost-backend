import { Request } from "express";

export const attachUserIdInPayload = (req: Request) => ({
  userId: req.userId,
  ...req.body,
});
