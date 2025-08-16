import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";

interface AuthenticatedRequest extends Request {
  userId: string;
}

export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req;

    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      userData: {
        name: user.username,
        isAccountVerified: user.isAccountVerified,
      },
    });
    console.log("data sent to frontend successfully");
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
