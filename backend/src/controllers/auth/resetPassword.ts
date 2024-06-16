import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const resetPassword = async (req: Request, res: Response) => {
  const { formData, resetToken } = req.body;

  if (!resetToken) {
    return res.status(400).json({
      message:
        "Could not reset password. There was no token provided. Please use reset link from email you got.",
    });
  }

  if (formData.password !== formData.confirmPassword) {
    return res.status(400).json({
      message: "Could not reset password. Passwords were not the same.",
    });
  }
  try {
    // Find the password reset record by token
    const resetRecord = await prisma.passwordReset.findFirst({
      where: {
        resetToken,
        tokenExpiresAt: {
          gte: new Date(), // Token should not be expired
        },
      },
    });

    if (!resetRecord) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    // Hashing password with salting
    const hashedPassword = await bcrypt.hash(
      formData.password,
      Number(process.env.SALT) || 10
    );

    // Update the user's password in the database
    await prisma.user.update({
      where: { id: resetRecord.userId },
      data: { password: hashedPassword },
    });

    // Delete the password reset record
    await prisma.passwordReset.delete({
      where: { id: resetRecord.id },
    });
    res.status(200).json({
      message:
        "Password successfully updated. You can now log in with your new password.",
    });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};
