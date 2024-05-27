import { Router } from "express";
import {
  register,
  login,
  test2,
  getUserDetails,
} from "../controllers/authController";
import { auth } from "@/middleware/Auth/Authorization";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getUserDetails);
router.post("/test2", test2);

export default router;
