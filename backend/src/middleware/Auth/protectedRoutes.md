// routes/user.ts
//
//
import { Router } from "express";
import { auth } from "../middleware/auth";
import { getUserInfo } from "../controllers/userController";

const router = Router();

router.get("/me", auth, getUserInfo);

export default router;
//
//
// controllers/userController.ts
//
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserInfo = async (req: Request, res: Response) => {
try {
const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true }, // Select only necessary fields
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);

} catch (error) {
res.status(500).json({ error: "An unexpected error occurred" });
}
};
