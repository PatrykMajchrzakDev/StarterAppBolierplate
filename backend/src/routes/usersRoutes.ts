import { Router } from "express";
import { getAllUsers } from "@/controllers/users/usersController";
import { auth, isAdmin } from "@/middleware/Auth/Authorization";

const router = Router();

// Get all users
router.get("/getAllUsers", auth, isAdmin, getAllUsers);

export default router;
