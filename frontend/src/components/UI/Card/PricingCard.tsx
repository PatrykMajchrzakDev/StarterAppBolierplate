// This components functionality is to display pricing cards and redirect user
// to Stripe checkout
import { useQuery } from "@tanstack/react-query";
// ========= MODULES ==========
import styles from "./styles/PricingCard.module.scss";

// ======= COMPONENTS =========
import { useLogout, useUser } from "@/lib/auth";
import { getRedirectLinkToCheckout } from "@/features/payments/makePayment";
import { useNotificationState } from "@/store/UI/NotificationStore";

import { Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ChipStylesType = {
  variant: "outlined" | "filled";
  size: "small" | "medium";
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  title: string;
};

type PricingCardProps = {
  title: string;
  titleColor: string;
  description: string;
  price: number;
  currency: string;
  chipStyle?: ChipStylesType;
  linkToCheckout?: string;
};

const PricingCard = ({
  title,
  titleColor,
  description,
  price,
  currency,
  linkToCheckout,
  chipStyle,
}: PricingCardProps) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { data: userData } = useUser();
  const userId = userData?.user.id;

  // Use the custom hook to fetch the redirect link
  const { refetch, isLoading } = useQuery({
    queryKey: ["redirectLinkToCheckout", linkToCheckout, userId],
    queryFn: () =>
      getRedirectLinkToCheckout(linkToCheckout as string, userId as string),
    // The query will not execute until the userId exists
    enabled: false,
  });

  // Function to handle the redirection logic
  const handleRedirect = async () => {
    // If button has not linkToCheckout (is for default user)
    if (!linkToCheckout) {
      navigate("/app");
      return;
    }
    const { data: fetchedRedirectLink } = await refetch();

    if (fetchedRedirectLink) {
      // Redirect the user if the redirect link is available
      window.location.href = fetchedRedirectLink;
    } else {
      // Notify the user if redirect failed and redirect to signin
      useNotificationState
        .getState()
        .setNotification(
          `There was something missing. Please sign in again. Sorry for the inconvenience.`,
          "error",
          "outlined"
        );
      navigate("/signin");
      logout.mutate({});
    }
  };

  return (
    <div id={styles.card}>
      {chipStyle && (
        <Chip
          variant={chipStyle.variant}
          color={chipStyle.color}
          size={chipStyle.size}
          label={chipStyle.title}
        />
      )}
      <div className={styles.cardContent}>
        <h3 style={{ color: titleColor }}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.price}>
          <span className={styles.currency}>{currency}</span>
          <span className={styles.priceValue}>{price}</span>
        </div>
        <Button
          variant="contained"
          className={styles.getStartedButton}
          onClick={handleRedirect}
          disabled={isLoading}
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
