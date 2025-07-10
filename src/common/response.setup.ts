import { Response } from "express";

export const successResponseSend = <T>(res: Response, data: T) => {
  res.status(200).json(data);
};

export const basStatusSend = <
  T extends { message?: string; data?: string | unknown }
>(
  res: Response,
  data: T,
  code?: number
) => {
  return res
    .status(data?.message === "Internal server error" ? 500 : code || 400)
    .send(data);
};
