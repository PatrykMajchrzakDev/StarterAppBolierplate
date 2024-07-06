import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// SECRET is used to later create token using this string
const SECRET =
  process.env.JWT_SECRET || "rMk,E(6SvKw;5q=[CTf!pN+?hY<d@$.Ha47B%8zg";

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

// ====================================================================
// =============== Login user when called from frontend ===============
// ====================================================================
export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;
  try {
    // check if email exists
    const user = await prisma.user.findUnique({ where: { email } });

    // if not exists then return error
    if (!user) return res.status(404).json({ error: "User not found" });

    // only local users can put in password so check if password exists
    if (user.provider !== "LOCAL") {
      throw new Error(
        "Login via password is only possible to previously created users"
      );
    }
    // validate password
    if (!user.password) {
      return res.status(400).json({
        error:
          "No password set for this user. Please use the appropriate login method.",
      });
    }
    // check if user is verified
    if (!user.isVerified)
      return res.status(400).json({
        error:
          "Please first verify your account. Check your email and spam folder.",
      });

    // validate password
    const validPassword = await bcrypt.compare(password, user.password);

    // if not identical then return error
    if (!validPassword)
      return res.status(401).json({ error: "Invalid Password" });

    // check if user wants to be authed longer
    const isrememberMe = rememberMe ? true : false;

    // if all good then create token and send it with response
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET);

    // Destructure user object to exclude password
    const { password: _, ...userWithoutPassword } = user;

    res.json({ token: token, user: userWithoutPassword, isrememberMe });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const user = req.user as any;
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET);
  // Send the token and user information in the response body
  res.redirect(`${process.env.FRONTEND_BASE_URL}/auth/callback?token=${token}`);
};
