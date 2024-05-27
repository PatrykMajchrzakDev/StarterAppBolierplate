import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const SECRET =
  process.env.JWT_SECRET || "rMk,E(6SvKw;5q=[CTf!pN+?hY<d@$.Ha47B%8zg";

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

// Register user when called from frontend
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER", // Assign 'USER' role by default
        name,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};

// Login user when called from frontend
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid Password" });

    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET);
    console.log("login successfull");
    res.json({ token: token, user: user });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};

// Get authenticated user details - authorization is done via middleware
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (typeof userId !== "number") {
      return res.status(400).json({ error: "Invalid user ID (not a number)" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details" });
  }
};
// Just a test routing
export const test2 = async (req: Request, res: Response) => {
  console.log("test2 accessed");
  const user = {
    id: "123asdasd",
    name: "test2",
    role: "USER",
  };
  const token = "1231231133121";
  res.json({ user, token });
};
