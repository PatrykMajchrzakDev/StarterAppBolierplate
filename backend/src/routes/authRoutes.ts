import { Router } from "express";
import passport from "passport";
import { getUserDetails } from "@/controllers/auth/userDetails";
import { auth } from "@/middleware/Auth/Authorization";
import { register } from "@/controllers/auth/register";
import { login, googleLogin } from "@/controllers/auth/login";
import { forgotPassword } from "@/controllers/auth/forgotPassword";
import {
  resendVerificationEmail,
  verifyEmail,
} from "@/controllers/auth/verifyRegister";
import { resetPassword } from "@/controllers/auth/resetPassword";

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

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

// Handle Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_BASE_URL}/signin` }),
  googleLogin
);

export default router;
