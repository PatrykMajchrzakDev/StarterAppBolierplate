import { Router } from "express";
import {
  getAllUsers,
  changeUserAvatar,
} from "@/controllers/users/usersController";
import { auth, isAdmin } from "@/middleware/Auth/Authorization";
const multer = require("multer");

// Multer init
const upload = multer({ storage: multer.memoryStorage() });

// Router init
const router = Router();

// Get all users
router.get("/getAllUsers", auth, isAdmin, getAllUsers);

// Change user avatar
router.post("/changeUserAvatar", auth, upload.single("file"), changeUserAvatar);

export default router;
