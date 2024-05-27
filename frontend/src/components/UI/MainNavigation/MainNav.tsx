// ========= MODULES ==========
import { Link } from "react-router-dom";
import styles from "./MainNav.module.scss";

// ======= COMPONENTS =========
import Button from "@mui/material/Button";

const MainNav = () => {
  return (
    <ul className={styles.list}>
      <li>1</li>
      <li>2</li>
      <li>3</li>

      <Link to={"/signin"}>
        <Button variant="outlined">Sign In</Button>
      </Link>
    </ul>
  );
};

export default MainNav;
