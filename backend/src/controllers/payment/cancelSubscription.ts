// This function cancels user auto subscription on Stripe

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import stripe from "@/utils/stripe";
const prisma = new PrismaClient();

export const cancelSubscription = async (req: Request, res: Response) => {
  const { subscriptionId, userId, token } = req.body;
  // Get the token from the Authorization header
  const authorizationToken = req
    .header("Authorization")
    ?.replace("Bearer ", "");

  // If provided arguments were not included in request then return error
  if (!subscriptionId || !userId || !token) {
    return res.status(400).json({
      error:
        "Could not cancel subscription. Provided informations didn't match",
    });
  }

  // If provided token was not equal authorization token then return error
  if (authorizationToken !== token) {
    return res.status(401).json({
      error:
        "Could not cancel subscription. Provided informations didn't match (token)",
    });
  }

  // Get user info from db
  const user = await prisma.user.findUnique({ where: { id: userId } });

  // If no user return error
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // If provided subscriptionId is not the same as user's then return error
  if (user.subscriptionId !== subscriptionId) {
    return res
      .status(404)
      .json({ error: "There was an error when checking subscription id" });
  }

  try {
    // Cancel the subscription immediately (at the end of the billing period by default)
    const canceledSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true, // cancels at the end of the current period
      }
    );

    res.json({
      message:
        "Subscription cancelled successfully. It will end at the current end period",
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ error: "Failed to cancel subscription." });
  }
};
