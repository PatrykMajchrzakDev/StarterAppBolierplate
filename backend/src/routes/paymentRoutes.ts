import { Router } from "express";
import { makePayment } from "@/controllers/payment/makePayment";
import { subscribe } from "@/controllers/payment/subscribe";

const router = Router();

// Stripe - make single payment route
router.post("/make-payment", makePayment);

router.get("/subscribe", subscribe);

export default router;
