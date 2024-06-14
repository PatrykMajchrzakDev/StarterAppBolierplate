import { Router } from "express";
import { test2, getUserDetails } from "@/controllers/auth/userDetails";
import { auth } from "@/middleware/Auth/Authorization";
import { register } from "@/controllers/auth/register";
import { login } from "@/controllers/auth/login";
import { resetPassword } from "@/controllers/auth/resetPassword";
import {
  resendVerificationEmail,
  verifyEmail,
} from "@/controllers/auth/verifyRegister";

const router = Router();
// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get user details
router.get("/me", auth, getUserDetails);

// Handle user verification token that is sent to user email
router.get("/verify-email", verifyEmail);

// Handle resend registration user token
router.post("/resend-verification-email", resendVerificationEmail);

router.post("/reset-password", resetPassword)

// Test route to check if route works
router.get("/test2", test2);

export default router;
