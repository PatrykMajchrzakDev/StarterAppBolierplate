// Routing for payments

import { Router } from "express";
import { subscribe } from "@/controllers/payment/subscribe";
import { cancelSubscription } from "@/controllers/payment/cancelSubscription";

const router = Router();

// Subscribe - payment
router.get("/subscribe", subscribe);
router.post("/cancelSubscription", cancelSubscription);

export default router;
