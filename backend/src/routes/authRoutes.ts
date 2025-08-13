import Router from "express";
import { RequestHandler } from "express";
import {
  refresh,
  login,
  logout,
  register,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
} from "../controllers/authController";
import { userAuth } from "../middleware/userAuth";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);
authRouter.post(
  "/send-verify-otp",
  userAuth,
  sendVerifyOtp as unknown as RequestHandler
);
authRouter.post(
  "/verify-account",
  userAuth,
  verifyEmail as unknown as RequestHandler
);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);
