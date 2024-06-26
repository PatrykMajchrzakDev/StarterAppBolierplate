// This component functionality is to header - logo, theme toggler and navigation for landing page

// ============================
// ========= MODULES ==========
// ============================
import styles from "./LandingHeader.module.scss";
import { Link } from "react-router-dom";

import ThemeStore from "@/store/Theme/ThemeStore";
// ============================
// ======= COMPONENTS =========
// ============================
import MobileNav from "@/components/UI/MobileNavigation/MobileNav";
import LandingNavigation from "@/components/UI/TopNavigation/LandingNavigation/LandingNavigation";
import logo from "@/assets/img/logo.png";
import logoDM from "@/assets/img/logo-dm.png";

const LandingHeader = () => {
  const theme = ThemeStore((state) => state.theme);
  return (
    <div id={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <img
            src={theme === "light" ? logo : logoDM}
            alt="logo"
            loading="lazy"
            decoding="async"
            width="290px"
            height="52px"
          />
        </Link>
        <div className={styles.navActions}>
          <div className={styles.landingNav}>
            <LandingNavigation />
          </div>
          <div className={styles.mobileNav}>
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
