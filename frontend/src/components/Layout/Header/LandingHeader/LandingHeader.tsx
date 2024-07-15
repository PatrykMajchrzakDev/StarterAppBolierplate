// This component functionality is to header - logo, theme toggler and navigation for landing page

// ============================
// ========= MODULES ==========
// ============================
import styles from "./LandingHeader.module.scss";
import { Link as RouterLink } from "react-router-dom";

import ThemeStore from "@/store/Theme/ThemeStore";
// ============================
// ======= COMPONENTS =========
// ============================
import MobileNav from "@/components/UI/MobileNavigation/MobileNav";
// import LandingNavigation from "@/components/UI/TopNavigation/LandingNavigation/LandingNavigation";
import logo from "@/assets/img/logo.png";
import logoDM from "@/assets/img/logo-dm.png";
import { Button } from "@mui/material";
import ThemeToggler from "@/components/UI/ThemeToggler/ThemeToggler";
import {
  Home,
  Login,
  AppRegistration,
  Password,
  MarkEmailRead,
  Dashboard,
  Logout,
} from "@mui/icons-material";
import { useLogout, useUser } from "@/lib/auth";

const LandingHeader = () => {
  const { data } = useUser();
  const logout = useLogout();

  // List of nav items for landing mobile nav
  const navItems = data
    ? [
        { path: "/app", label: "Dashboard", icon: <Dashboard /> },
        {
          path: "/logout",
          label: "Logout",
          icon: <Logout />,
          onClick: () => {
            logout.mutate({});
          },
        },
      ]
    : [
        { path: "/", label: "Home", icon: <Home /> },
        { path: "/signin", label: "Sign In", icon: <Login /> },
        { path: "/signup", label: "Sign Up", icon: <AppRegistration /> },
        {
          path: "/forgotpassword",
          label: "Forgot Password",
          icon: <Password />,
        },
        {
          path: "/resendEmail",
          label: "Resend Email",
          icon: <MarkEmailRead />,
        },
      ];

  const loginOrDashboardIfUserExists = data ? (
    <Button variant="contained" size="small" to="/app" component={RouterLink}>
      Dashboard
    </Button>
  ) : (
    <Button variant="outlined" component={RouterLink} to="/signin">
      Sign In
    </Button>
  );

  const theme = ThemeStore((state) => state.theme);
  return (
    <div id={styles.header}>
      <div className={styles.wrapper}>
        {/* LOGO */}
        <RouterLink to="/" className={styles.logo}>
          <img
            src={theme === "light" ? logo : logoDM}
            alt="logo"
            loading="lazy"
            decoding="async"
            width="290px"
            height="52px"
          />
        </RouterLink>

        {/* RIGHT SIDE NAV ACTIONS */}
        <div className={styles.navActions}>
          <div className={styles.landingNav}>
            {/* DESKTOP LIST OF LINKS */}
            <ul className={styles.list}>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>{loginOrDashboardIfUserExists}</li>
              <li>
                <ThemeToggler id="1" />
              </li>
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

export default LandingHeader;
