import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};
