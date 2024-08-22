import { Request, Response } from "express";
import stripe from "@/utils/stripe";
import { getLogger } from "@/utils/logger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { Role } from "@prisma/client";
const logger = getLogger("STRIPE_PAYMENT", "PAYMENTS");

// Function when user clicks make payment in frontend
export const subscribe = async (req: Request, res: Response, next: any) => {
  //   Use provided options from frontend
  const plan = req.query.plan as string;
  const userId = req.query.userId as string;

  // Check for plan and userId params
  if (!userId || typeof userId !== "string") {
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/payment/cancelled`);
  }

  if (!plan || typeof plan !== "string") {
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/payment/cancelled`);
  }

  let priceId;
  // Role is imported from Prisma schema
  let newRole: Role;

  //   Those plans are taken from stripe PRODUCT CATALOG https://dashboard.stripe.com/products
  switch (plan.toLowerCase()) {
    case "subscriber":
      // THIS IS TEST MODE
      priceId = "price_1Pg9tx2MOnaYCpHvHE6amLjg";
      newRole = Role.SUBSCRIBER;
      //   priceId = "price_1Pg8ka2MOnaYCpHv5oArQseW";
      break;
    case "pro":
      // THIS IS TEST MODE
      priceId = "price_1Pg9u72MOnaYCpHvrEDURmye";
      newRole = Role.PRO;
      //   priceId = "price_1Pg8lE2MOnaYCpHvY64L57h7";
      break;

    default:
      return res.redirect(`${process.env.FRONTEND_BASE_URL}/payment/cancelled`);
  }

  // Function to update user role when payment is marked as 'paid'
  const pollPaymentStatus = async (sessionId: string, userId: string) => {
    let paymentComplete = false;

    while (!paymentComplete) {
      // Retrieve the checkout session (await to ensure sequential execution)
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        sessionId
      );

      if (checkoutSession.payment_status === "paid") {
        // Update the user's role in the database
        await prisma.user.update({
          where: { id: userId },
          data: { role: newRole },
        });

        // Update user db row when subscription expires
        let expirationDate;
        // TS condition
        if (typeof checkoutSession.subscription === "string") {
          const subscriptionInformations = await stripe.subscriptions.retrieve(
            checkoutSession.subscription
          );

          // Converts expiration date to date string
          expirationDate = new Date(
            subscriptionInformations.current_period_end * 1000
          );

          // Updates db with expiration date
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionExpirationDate: expirationDate,
              subscriptionId: checkoutSession.subscription,
            },
          });
        }

        // Log payment
        logger.info(
          `New payment via Stripe || Client ID: ${checkoutSession.customer}
       UserID: ${userId} NewRole: ${newRole} Date: ${new Date()} Session ID: ${
            checkoutSession.id
          } Email: ${checkoutSession.customer_details?.email} Name: ${
            checkoutSession.customer_details?.name
          }  InvoiceID: ${
            checkoutSession.invoice
          } SubExpirationDate: ${expirationDate}`
        );

        paymentComplete = true;
      } else {
        // Wait for a few seconds before checking again
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  };

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

    pollPaymentStatus(session.id, userId);

    // Send the session URL to the client
    res.status(200).json(session.url);
  } catch (error) {
    console.error("Error during checkout process:", error);
    res.status(500).send("An error occurred during the checkout process.");
  }
};
