import Stripe from "stripe";

const stripe = new Stripe(process.env.TEST_STRIPE_API_KEY || "", {
  apiVersion: "2024-06-20",
});

export default stripe;
