//This components functionality is to show fallback message if user is redirected
// upon successfull or unsuccessfull payment

// ========= MODULES ==========
import styles from "@/app/routes/General/styles/PaymentFallback.module.scss";
import { Link as RouterLink } from "react-router-dom";

// ======= COMPONENTS =========
import { Button, Icon, Link } from "@mui/material";

import { CheckCircleOutline, Dangerous } from "@mui/icons-material";

type FallbackProps = {
  isOk: boolean;
};

const PaymentFallback = ({ isOk }: FallbackProps) => {
  return (
    <div className={styles.box}>
      {isOk ? (
        <Icon>
          <CheckCircleOutline color="success" />
        </Icon>
      ) : (
        <Icon>
          <Dangerous color="error" />
        </Icon>
      )}
      {isOk ? (
        <h2>Payment successfull</h2>
      ) : (
        <h2>Could not finalize payment </h2>
      )}
      {isOk ? (
        <p>Thank you for supporting us!</p>
      ) : (
        <p>
          Something went wrong with the payment. Please return to main page and
          try again.
        </p>
      )}
      <Button variant="contained" className={styles.button}>
        <Link
          to={"/app"}
          component={RouterLink}
          sx={{ textDecoration: "none" }}
        >
          Go Back
        </Link>
      </Button>
    </div>
  );
};

export default PaymentFallback;
