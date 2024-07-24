import { Request, Response } from "express";
import Stripe from "stripe";
import { getLogger } from "@/utils/logger";

// Stripe config
const stripe = new Stripe(process.env.TEST_STRIPE_API_KEY || "", {
  apiVersion: "2024-06-20",
});

// Function when user clicks make payment in frontend
export const subscribe = async (req: Request, res: Response, next: any) => {
  // Log payment
  const logger = getLogger("STRIPE_PAYMENT");
  //   use provided options from frontend

  const plan = req.query.plan;

  if (!plan || typeof plan !== "string") {
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/payment/cancelled`);
  }

  let priceId;

  //   Those plans are taken from stripe PRODUCT CATALOG https://dashboard.stripe.com/products
  switch (plan.toLowerCase()) {
    case "subscriber":
      // THIS IS TEST MODE
      priceId = "price_1Pg9tx2MOnaYCpHvHE6amLjg";
      //   priceId = "price_1Pg8ka2MOnaYCpHv5oArQseW";
      break;
    case "pro":
      // THIS IS TEST MODE
      priceId = "price_1Pg9u72MOnaYCpHvrEDURmye";
      //   priceId = "price_1Pg8lE2MOnaYCpHvY64L57h7";
      break;

    default:
      return res.redirect(`${process.env.FRONTEND_BASE_URL}/payment/cancelled`);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      // Here I specify price for a product and quantity
      line_items: [{ price: priceId, quantity: 1 }],

      // Stripe automatically gives checkout session id
      // Success redirect
      success_url: `${process.env.FRONTEND_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      // Cancelled redirect
      cancel_url: `${process.env.FRONTEND_BASE_URL}/payment/cancelled`,
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
};
