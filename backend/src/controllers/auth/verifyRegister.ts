import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";
import { sendEmail } from "@/services/sendEmail";
import { addHours } from "date-fns";

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }

    // only local users can put in password so check if password exists
    if (user.provider !== "LOCAL") {
      throw new Error(
        "User email verification is only possible to previously created local users"
      );
    }

    // Generate new email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiresAt = addHours(new Date(), 48); // Token expires in 48 hours

    // Update or create verification record
    await prisma.emailVerification.upsert({
      where: { userId: user.id },
      update: {
        verificationToken: verificationToken,
        tokenExpiresAt: tokenExpiresAt,
      },
      create: {
        userId: user.id,
        verificationToken: verificationToken,
        tokenExpiresAt: tokenExpiresAt,
      },
    });

    // Send new verification email
    const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;
    const emailSubject = "Resend Email Verification";
    const emailMessage = `<p>Please verify your email by clicking on the following link:</p>
                            <a href="${verificationLink}">Verify Email</a>
                            <p>We hope you have a great time with our app.</p>
                            <p>Sincerely,</p>
                            <p>TBC</p>`;

    await sendEmail(email, emailSubject, emailMessage);

    res
      .status(200)
      .json(
        "A new verification email has been sent. Please check your email to verify your account."
      );
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};

// ====================================================================
// ============= Verification user account through email ==============
// ====================================================================
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    // Find the verification record by token
    const verification = await prisma.emailVerification.findFirst({
      where: {
        verificationToken: token as string,
        tokenExpiresAt: {
          gte: new Date(), // Token should not be expired
        },
      },
    });

    if (!verification) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification token." });
    }

    // Update the user's status to verified
    await prisma.user.update({
      where: { id: verification.userId },
      data: { isVerified: true },
    });

    // Delete the verification record
    await prisma.emailVerification.delete({
      where: { id: verification.id },
    });

    res
      .status(200)
      .json(
        "Email successfully verified. You can now close this tab and sign in. Have fun!"
      );
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};
