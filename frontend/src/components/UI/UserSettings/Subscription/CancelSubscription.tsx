// This component holds just a button which when clicked is gonna cancel user's subscription

import { cancelSubscription } from "@/features/payments/cancelSubscription";
import { useUser } from "@/lib/auth";
import { useNotificationState } from "@/store/UI/NotificationStore";

import { Button } from "@mui/material";

const CancelSubscription = () => {
  const { data: userData } = useUser();
  const userSubscriptionId = userData?.user.subscriptionId;
  const token = userData?.token;
  const userId = userData?.user.id;

  const handleCancelSubscription = async () => {
    if (userSubscriptionId && token && userId) {
      cancelSubscription(userSubscriptionId, userId, token);
    } else {
      useNotificationState
        .getState()
        .setNotification(
          `It looks like you don't have any paid subscription. Please check again and if the problem occurs then contact support`,
          "error",
          "outlined"
        );
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        onClick={handleCancelSubscription}
      >
        Cancel Subscription
      </Button>
    </div>
  );
};

export default CancelSubscription;
