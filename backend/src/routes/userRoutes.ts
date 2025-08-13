import { Router } from "express";
import { getUserData } from "../controllers/userController";
import { userAuth } from "../middleware/userAuth";
import { RequestHandler } from "express";

export const userRouter = Router();

userRouter.get(
  "/getUserData",
  userAuth,
  getUserData as unknown as RequestHandler
);
