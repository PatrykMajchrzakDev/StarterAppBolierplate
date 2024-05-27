// ============================
// ============================
// This middleware checks for user's token that is got from post header.
// Thanks to this Authorization protected API routes can be created.
// Check for protectedRoutes.md how it works.
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET =
  process.env.JWT_SECRET || "rMk,E(6SvKw;5q=[CTf!pN+?hY<d@$.Ha47B%8zg";

interface JwtPayload {
  userId: number;
  role: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Extending Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
