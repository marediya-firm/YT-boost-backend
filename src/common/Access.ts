import { NextFunction } from "express";
import { basStatusSend } from "./response.setup";
import { Request, Response } from "express";
import { UserModel } from "../model/user.model";
/**
 * *which route without token accessible
 */
const withoutTokenAccess = {
  // ["/auth/login"]: "/auth/login",
  // ["/auth/createaccount"]: "/auth/createaccount",
  ["/api/users/auth/create"]: "/api/users/auth/create",
  ["/api/users/auth/serverIsRunning"]: "/api/users/auth/serverIsRunning",
} as const;

export const accessPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const path =
      req.originalUrl as (typeof withoutTokenAccess)[keyof typeof withoutTokenAccess];

    if (
      req.originalUrl === "/.well-known/appspecific/com.chrome.devtools.json"
    ) {
      res.status(204).end(); // No Content response
      return;
    }
    console.log("===<<<<path===>>>>", path);
    if (withoutTokenAccess[path]) return next();
    const tokenValue =
      req?.headers?.authorization?.split(" ")?.[1] ?? ("" as string);
    console.log("+++++++tokenValue", tokenValue);

    /**
     * For future reference
     */
    const findUserFromToken = await UserModel.findOne({
      idToken: tokenValue,
    })?.exec();
    /**
     * TODO compete without authentication
     */
    // next();
    console.log("findUserFromToken", findUserFromToken?.idToken);
    if (findUserFromToken?.idToken) {
      req.userId = findUserFromToken?._id ?? "";
      next();
    }
  } catch (error) {
    console.log("accessPermission", error);
    basStatusSend(res, { data: "unauthorized" });
  }
};
