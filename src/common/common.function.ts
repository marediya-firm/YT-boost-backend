import { Request } from "express";
import geoip from "geoip-lite";

export const attachUserIdInPayload = (req: Request) => ({
  userId: req.userId,
  ...req.body,
});

export const attachUserIdInQuery = (req: Request) => ({
  userId: req.userId,
  ...req.query,
});

export const resolveDateParam = (date?: string) =>
  date ? new Date(date)?.toISOString() : new Date()?.toISOString();

export const getCountryFromIP = (ip: string) => {
  const geo = geoip.lookup(ip);
  console.log("=================================================",geo);
  return geo?.country || null; // Returns country code like "IN"
};
