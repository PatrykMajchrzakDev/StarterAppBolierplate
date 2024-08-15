// This components functionality is to show pricing route

// ========= MODULES ==========
import axios from "axios";
import styles from "./styles/PricingCard.module.scss";

// ======= COMPONENTS =========
import { useUser } from "@/lib/auth";

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
  const { data } = useUser();
  const navigate = useNavigate();
  const userId = data?.user.id;

  const signInRedirect = "/signin";

  const handleRedirect = async () => {
    if (linkToCheckout) {
      try {
        const urlWithParams = `${linkToCheckout}&userId=${userId}`;
        // Response is a link to checkout
        const response = await axios.get<string>(urlWithParams);

        const redirectLink = response.data; // The link received from the server
        console.log(redirectLink);
        if (data?.user) {
          // If user is signed in, use the link provided by the server
          window.location.href = redirectLink;
        } else {
          // If user is not signed in, redirect to the sign-in page
          navigate(signInRedirect);
        }
      } catch (error) {
        console.error("Error fetching redirect link:", error);
        navigate(signInRedirect);
      }
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
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
