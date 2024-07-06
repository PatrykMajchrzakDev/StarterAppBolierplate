import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

// ====================================================================
// ============ Get authenticated user details ========================
// ============ authorization is done via middleware ==================
// ====================================================================
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    // checks if user has id
    const userId = req.user?.userId;

    // get token from headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // check if ID is present
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // If ID is present then search db
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Destructure user object to exclude password
    const { password, verificationToken, ...userWithoutSensitiveInfo } = user;

    // If all good then return response with user info and token
    res.json({ user: userWithoutSensitiveInfo, token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details" });
  }
};
