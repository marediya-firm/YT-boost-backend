import { Request, Response } from "express";
// import { verifyGoogleIdToken } from "../config/jwt";
import { OAuth2Client } from "google-auth-library";

interface GetUsersRequestBody {
  token: string;
}

const client = new OAuth2Client(
  "221304263774-aqkmi9aipevoctfbf4l05biikprc3888.apps.googleusercontent.com"
);

export const getUsers = async (
  req: Request<{}, {}, GetUsersRequestBody>, // params, resBody, reqBody
  res: Response
) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience:
        "221304263774-aqkmi9aipevoctfbf4l05biikprc3888.apps.googleusercontent.com", // Must match the client ID used on the frontend
    });

    const payload = ticket.getPayload();
    console.log("payload",payload);
    
    // console.log("req?.body?.token", req?.body?.token);
    // const decoded = jwt.verify(req.body.token, () => {});
    // console.log("decoded", decoded);

    res.json({ message: "Get all users" });
  } catch (error) {
    res.status(401).json({ error: "Invalid token", details: error });
  }
};
export const createUser = (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(201).json({ message: `User ${name} created.` });
};
