// ========= MODULES ==========
import { Link } from "react-router-dom";
import styles from "./MainNav.module.scss";

import { useUser } from "@/lib/auth";
// ======= COMPONENTS =========
import { Button } from "@mui/material";
import UserProfileTooltip from "../User/UserProfileTooltip";

const MainNav = () => {
  const { data: user } = useUser();

  return (
    <ul className={styles.list}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      {user ? (
        <UserProfileTooltip />
      ) : (
        // IF NO USER THEN DISPLAY SIGN IN BUTTON
        <li>
          <Button variant="outlined" component={Link} to="/signin">
            Sign In
          </Button>
        </li>
      )}
    </ul>
  );
};

export default MainNav;
