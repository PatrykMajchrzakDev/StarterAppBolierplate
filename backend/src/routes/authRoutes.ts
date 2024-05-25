import { Router } from "express";
import { register, login, test2 } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/test2", test2);

export default router;
