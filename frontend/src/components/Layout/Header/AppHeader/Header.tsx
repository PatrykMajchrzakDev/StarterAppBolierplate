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
import logo from "@/assets/img/logo.png";
import logoDM from "@/assets/img/logo-dm.png";
import ThemeStore from "@/store/Theme/ThemeStore";
import UserProfileTooltip from "@/components/UI/User/UserProfileTooltip";
import { useUser } from "@/lib/auth";

import { Home, Logout } from "@mui/icons-material";

const navItems = [
  { path: "/app", label: "Home", icon: <Home /> },
  { path: "/logout", label: "Logout", icon: <Logout /> },
];

const Header = () => {
  const { data: user } = useUser();
  const theme = ThemeStore((state) => state.theme);
  return (
    <div id={styles.header}>
      <div className={styles.wrapper}>
        {/* LOGO */}
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

        {/* RIGHT SIDE NAV ACTIONS */}
        <div className={styles.navActions}>
          <div className={styles.landingNav}>
            {/* DESKTOP LIST OF LINKS */}
            <ul className={styles.list}>
              <li>
                <ThemeToggler id="1" />
              </li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>{user && user.user && <UserProfileTooltip />}</li>
            </ul>
          </div>

          {/* MOBILE LIST OF LINKS */}
          <div className={styles.mobileNav}>
            <MobileNav navItems={navItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
