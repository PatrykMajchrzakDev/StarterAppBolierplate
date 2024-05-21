// ============================
// ========= MODULES ==========
// ============================
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
// ============================
// ======= COMPONENTS =========
// ============================
import ThemeToggler from "@/components/UI/ThemeToggler/ThemeToggler";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <div id={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          MY APP LOGO
        </Link>
        <div className={styles.navActions}>
          <ThemeToggler id="1" />
          <ul className={styles.list}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <Link to={"/signin"}>
              <Button variant="outlined">LOGIN</Button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
