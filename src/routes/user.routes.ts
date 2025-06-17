import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controller";

const router = Router();

router.get("/me", getUsers).post("/create", createUser);
export default router;
