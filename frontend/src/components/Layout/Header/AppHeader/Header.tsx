// This component functionality is to header - logo, theme toggler and navigation for main app

// ============================
// ========= MODULES ==========
// ============================
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
// ============================
// ======= COMPONENTS =========
// ============================
import ThemeToggler from "@/components/UI/ThemeToggler/ThemeToggler";
import MobileNav from "@/components/UI/MobileNavigation/MobileNav";
import MainNav from "@/components/UI/TopNavigation/AppNavigation/MainNav";
import logo from "@/assets/img/logo.png";

const Header = () => {
  return (
    <div id={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo" loading="lazy" decoding="async" />
        </Link>
        <div className={styles.navActions}>
          <ThemeToggler id="1" />
          <div className={styles.mainNav}>
            <MainNav />
          </div>
          <div className={styles.mobileNav}>
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
