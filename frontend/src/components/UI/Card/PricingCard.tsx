// This components functionality is to show pricing route

// ========= MODULES ==========
import styles from "./styles/PricingCard.module.scss";

// ======= COMPONENTS =========
import { useUser } from "@/lib/auth";

import { Chip, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
};

const PricingCard = ({
  title,
  titleColor,
  description,
  price,
  currency,
  chipStyle,
}: PricingCardProps) => {
  const { data } = useUser();

  const signInOrBuyLink = data?.user ? "/app" : "/signin";
  return (
    <div className={styles.card}>
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
        <Button variant="contained" className={styles.getStartedButton}>
          <Link to={signInOrBuyLink} component={RouterLink}>
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
