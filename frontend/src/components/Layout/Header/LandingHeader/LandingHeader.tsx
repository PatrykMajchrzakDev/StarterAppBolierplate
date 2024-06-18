// This component functionality is to header - logo, theme toggler and navigation for landing page

// ============================
// ========= MODULES ==========
// ============================
import styles from "./LandingHeader.module.scss";
import { Link } from "react-router-dom";
// ============================
// ======= COMPONENTS =========
// ============================
import ThemeToggler from "@/components/UI/ThemeToggler/ThemeToggler";
import MobileNav from "@/components/UI/MobileNavigation/MobileNav";
import LandingNavigation from "@/components/UI/TopNavigation/LandingNavigation/LandingNavigation";

const LandingHeader = () => {
  return (
    <div id={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          MY APP LOGO
        </Link>
        <div className={styles.navActions}>
          <ThemeToggler id="1" />
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
