// types/express/index.d.ts
import { Request } from "express";
import { ObjectId } from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string | number | TypeError.ObjectId; // 👈 your custom field
  }
}
