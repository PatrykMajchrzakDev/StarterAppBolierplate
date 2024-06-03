import { Router } from "express";
import {
  register,
  login,
  test2,
  getUserDetails,
} from "../controllers/authController";
import { auth } from "@/middleware/Auth/Authorization";

const router = Router();
// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get user details
router.get("/me", auth, getUserDetails);

// Test route to check if route works
router.get("/test2", test2);

export default router;
