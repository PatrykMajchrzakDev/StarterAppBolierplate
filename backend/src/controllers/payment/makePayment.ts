import { Request, Response } from "express";
import Stripe from "stripe";
import { getLogger } from "@/utils/logger";

// Stripe config
const stripe = new Stripe(process.env.STRIPE_API_KEY || "", {
  apiVersion: "2024-06-20",
});

// Function when user clicks make payment in frontend
export const makePayment = async (req: Request, res: Response, next: any) => {
  // Log payment
  const logger = getLogger("STRIPE_PAYMENT");

  //   use provided options from frontend
  try {
    const { amount, currency, paymentMethodType } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [paymentMethodType],
      payment_method_options: {
        blik: {},
        p24: {},
      },
      confirm: true,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    logger.error(`Error creating payment intent: ${error.message}`);
    next(error);
  }
};
