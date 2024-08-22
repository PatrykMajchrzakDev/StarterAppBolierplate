// This file holds a function which makes a request to backend to cancel user's subscription

import axios from "axios";
import { useNotificationState } from "@/store/UI/NotificationStore";

const apiUrl = import.meta.env.VITE_API_URL;
export const cancelSubscription = async (
  subscriptionId: string,
  userId: string,
  token: string
) => {
  try {
    // Request to backend to cancel user's subscription payment
    const response = await axios.post(
      `${apiUrl}/payment/cancelSubscription`,
      {
        subscriptionId,
        userId,
        token,
      },
      // Header has to be provided as well to verify token on the backend
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    useNotificationState
      .getState()
      .setNotification(
        `You have successfully cancelled your subscription You will NOT be charged for  next month.`,
        "success",
        "outlined"
      );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || "Failed to cancel subscription"
      );
    } else {
      // Handle non-Axios errors
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while canceling the subscription"
      );
    }
  }
};
