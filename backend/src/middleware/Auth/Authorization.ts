// ============================
// ============================
// This middleware checks for user's token that is got from post header.
// Thanks to this Authorization protected API routes can be created.
// Check for protectedRoutes.md how it works.
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Used to decode token
const SECRET =
  process.env.JWT_SECRET || "rMk,E(6SvKw;5q=[CTf!pN+?hY<d@$.Ha47B%8zg";

// JWT types
interface JwtPayload {
  userId: number;
  role: string;
}

// Middleware function to check if user is authorized
export const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header prop "Authorization" and remove "bearer"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify and if user is ok then pass it to protected route
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
