import { Request, Response } from "express";
// import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../model/user.model";
import { successResponseSend } from "../common";
import { AuthPayload } from ".";
import jwtAuth, { secret } from "../config/secret";

// interface GetUsersRequestBody {
//   token: string;
// }

// const client = new OAuth2Client(
//   "221304263774-aqkmi9aipevoctfbf4l05biikprc3888.apps.googleusercontent.com"
// );

// export const getUsers = async (
//   req: Request<{}, {}, GetUsersRequestBody>, // params, resBody, reqBody
//   res: Response
// ) => {
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: req.body.token,
//       audience:
//         "221304263774-aqkmi9aipevoctfbf4l05biikprc3888.apps.googleusercontent.com", // Must match the client ID used on the frontend
//     });
//     const payload = ticket.getPayload();
//     console.log("payload", payload);

//     res.json({ message: "Get all users" });
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token", details: error });
//   }
// };

// Create or update a user by Google email and return the user document
export const createUser = async (
  req: Request<{}, {}, AuthPayload>,
  res: Response
) => {
  try {
    console.log("createUser called");

    // Extract payload from request
    const payload = { ...req.body };

    // Generate local JWT token
    const generatedToken = jwtAuth.sign(payload.user, secret);
    console.log("Generated local token:", generatedToken);

    // Update payload with generated token
    payload.user.googleToken = payload.idToken;
    payload.idToken = generatedToken;

    // Prepare fields to update in DB
    const updateFields = {
      idToken: generatedToken,
      user: {
        ...payload.user,
        googleToken: payload.user.googleToken,
      },
    };

    // Find by user email and update, or insert if not found
    const updatedUser = await UserModel.findOneAndUpdate(
      { "user.email": payload.user.email }, // Filter by user email
      { $set: updateFields }, // Fields to update
      { upsert: true, new: true } // Create if not found, return new doc
    ).lean(); // Convert to plain JS object

    console.log("User created or updated:", updatedUser);
    successResponseSend(res, updatedUser);
  } catch (error: any) {
    console.error("createUser error:", error?.message);
    res.sendStatus(401);
  }
};
