// ========= MODULES ==========
import { Link } from "react-router-dom";
import styles from "./LandingNavigation.module.scss";

// ======= COMPONENTS =========
import { Button } from "@mui/material";
import ThemeToggler from "../../ThemeToggler/ThemeToggler";

const LandingNavigation = () => {
  return (
    <ul className={styles.list}>
      <li>
        <ThemeToggler id="1" />
      </li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>
        <Button variant="outlined" component={Link} to="/signin">
          Sign In
        </Button>
      </li>
    </ul>
  );
};

export default LandingNavigation;
