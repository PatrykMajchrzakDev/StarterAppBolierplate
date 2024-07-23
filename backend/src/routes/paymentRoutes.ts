import { Router } from "express";
import { makePayment } from "@/controllers/payment/makePayment";

const router = Router();

// Stripe - make payment route
router.post("/make-payment", makePayment);

export default router;
