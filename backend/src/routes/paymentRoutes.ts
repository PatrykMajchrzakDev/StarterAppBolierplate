import { Router } from "express";
import { subscribe } from "@/controllers/payment/subscribe";

const router = Router();

// Subscribe - payment
router.get("/subscribe", subscribe);

export default router;
