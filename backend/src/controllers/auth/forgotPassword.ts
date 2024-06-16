import { Request, Response } from "express";
import { validateEmail } from "@/validation/emailValidation";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/services/sendEmail";
import { addHours } from "date-fns";
const prisma = new PrismaClient();

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

// ====================================================================
// === Send email to reset user password when called from frontend ====
// ====================================================================
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    // Destructure request body
    const { email } = req.body;

    const { error } = validateEmail({ email });
    if (error) {
      // If validation fails, return nothing. Do not tell if there was hit or not for security reasons
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset email has been sent.",
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // If no user then return nothing. Do not tell if there was hit or not for security reasons
    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset email has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiresAt = addHours(new Date(), 1);

    // Store the token in the database
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        resetToken,
        tokenExpiresAt,
      },
    });

    // Send reset password email
    const resetLink = `${process.env.FRONTEND_BASE_URL}/resetpassword?token=${resetToken}`;
    const emailSubject = "Password Reset";
    const emailMessage = `<p>To reset your password, please click on the following link:</p>
                           <a href="${resetLink}">Reset Password</a>
                           <p>If you did not request a password reset, please ignore this email.</p>
                           <p>Sincerely,</p>
                           <p>TBC Your App Team</p>`;

    await sendEmail(email, emailSubject, emailMessage);
    res.status(200).json({
      message:
        "If an account with that email exists, a password reset email has been sent.",
    });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};
