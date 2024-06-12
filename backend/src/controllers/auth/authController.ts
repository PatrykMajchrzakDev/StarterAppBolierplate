import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";

// SECRET is used to later create token using this string
const SECRET =
  process.env.JWT_SECRET || "rMk,E(6SvKw;5q=[CTf!pN+?hY<d@$.Ha47B%8zg";

// Helper function to type guard
const isErrorWithMessage = (error: any): error is { message: string } => {
  return typeof error === "object" && error !== null && "message" in error;
};
// ===============================================
// === Register user when called from frontend ===
// ===============================================
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
    const hashedPassword = await bcrypt.hash(password, process.env.SALT || 10);

    // If everything OK then create user in db
    const user = await prisma.user.create({
      data: {
        id: id,
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
// ===============================================
// ==== Login user when called from frontend =====
// ===============================================
export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;
  try {
    // check if email exists
    const user = await prisma.user.findUnique({ where: { email } });

    // if not exists then return error
    if (!user) return res.status(404).json({ error: "User not found" });

    // validate password
    const validPassword = await bcrypt.compare(password, user.password);

    // if not identical then return error
    if (!validPassword)
      return res.status(401).json({ error: "Invalid Password" });

    // check if user wants to be auth longer
    const isrememberMe = rememberMe ? true : false;

    // if all good then create token and send it with response
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET);

    res.json({ token: token, user: user, isrememberMe });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};
// ===========================================================================
// == Get authenticated user details - authorization is done via middleware ==
// ===========================================================================
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
    // If all good then return response with user info and token
    res.json({ user, token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details" });
  }
};

// Just a test routing
export const test2 = async (req: Request, res: Response) => {
  console.log(crypto.randomBytes(5).toString("hex"));
  // console.log("test2 accessed");
  const user = {
    id: "123asdasd",
    name: "test2",
    role: "USER",
  };
  const token = "1231231133121";
  res.json({ user, token });
};
