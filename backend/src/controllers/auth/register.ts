import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";
import { sendEmail } from "@/services/sendEmail";
import { addHours } from "date-fns";

// SECRET is used to later create token using this string
const SECRET =
  process.env.JWT_SECRET || "rMk,E(6SvKw;5q=[CTf!pN+?hY<d@$.Ha47B%8zg";

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

// ====================================================================
// ============= Register user when called from frontend ==============
// ====================================================================
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    // checks db for existing user email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res
        .status(400)
        .json({ error: "User with this email already exists" });

    // checks db for existing user name
    const existingUserName = await prisma.user.findUnique({ where: { name } });
    if (existingUserName)
      return res
        .status(400)
        .json({ error: "User with this name already exists" });

    let id;
    let sameId;

    do {
      id = crypto.randomBytes(5).toString("hex");
      sameId = await prisma.user.findUnique({ where: { id } });
    } while (sameId);

    // Hashing password with salting
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT) || 10
    );

    // Create the user in the database with an inactive status
    const user = await prisma.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
        role: "USER", // Assign 'USER' role by default
        name,
        isVerified: false,
      },
    });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiresAt = addHours(new Date(), 48); // Token expires in 48 hours

    // Create email verification entry
    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        verificationToken: verificationToken,
        tokenExpiresAt: tokenExpiresAt,
      },
    });
    // Send verification email
    const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;
    const emailSubject = "Email Verification";
    const emailMessage = `<p>Please verify your email by clicking on the following link:</p>
                          <a href="${verificationLink}">Verify Email</a>
                          <p>We hope you have a great time with our app.</p>
                          <p>Sincerely,</p>
                          <p>TBC</p>`;

    await sendEmail(email, emailSubject, emailMessage);

    res
      .status(201)
      .json("Registered user. Please check your email to verify your account.");
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};
