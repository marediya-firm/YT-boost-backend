import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const router = Router();

router
  .get("/me", (req, res) => {
    console.log(req.userId);
    res.sendStatus(200);
  })
  .post("/create", createUser)
  .get("/serverIsRunning", (_, res) => {
    res.sendStatus(200);
  });
export default router;
