// This component functionality is to header - logo, theme toggler and navigation for landing page

// ============================
// ========= MODULES ==========
// ============================
import styles from "./LandingHeader.module.scss";
import { Link as RouterLink, useLocation } from "react-router-dom";

// ============================
// ======= COMPONENTS =========
// ============================
import ThemeStore from "@/store/Theme/ThemeStore";
import MobileNav from "@/components/Layout/MobileNavigation/MobileNav";
import { useLogout, useUser } from "@/lib/auth";
import ThemeToggler from "@/components/UI/ThemeToggler/ThemeToggler";

import logo from "@/assets/img/logo.png";
import logoDM from "@/assets/img/logo-dm.png";

import { Link } from "@mui/material";
import {
  Home,
  Login,
  AppRegistration,
  Password,
  MarkEmailRead,
  Dashboard,
  Logout,
  Loyalty,
} from "@mui/icons-material";
import UserProfileTooltip from "@/components/Profile/UserProfileTooltip";

const LandingHeader = () => {
  const { data } = useUser();
  const logout = useLogout();
  const location = useLocation();

  // List of nav items for landing mobile nav
  const mobileNavItems = data
    ? [
        { path: "/app", label: "Dashboard", icon: <Dashboard /> },
        { path: "/pricing", label: "Pricing", icon: <Loyalty /> },
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
        { path: "/pricing", label: "Pricing", icon: <Loyalty /> },
      ];

  // Variable to check if user is logged in - display Dashboard button if so
  const loginOrDashboardIfUserExists = data ? (
    <Link to="/app" component={RouterLink}>
      Dashboard
    </Link>
  ) : (
    <Link component={RouterLink} to="/signin">
      Sign In
    </Link>
  );

  // Check if user is logged in - if so then show profile else show theme toggler
  const profileOrThemeToggler = data ? (
    <UserProfileTooltip />
  ) : (
    <ThemeToggler id="1" />
  );

  // Set class based on current location
  const isActive = (path: string) => location.pathname === path;

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
            <ul className={styles.links}>
              <li className={isActive("/") ? styles.isActive : ""}>
                <Link component={RouterLink} to={"/"}>
                  Home
                </Link>
              </li>
              <li className={isActive("/pricing") ? styles.isActive : ""}>
                <Link component={RouterLink} to={"/pricing"}>
                  Pricing
                </Link>
              </li>
              <li className={isActive("/signin") ? styles.isActive : ""}>
                {loginOrDashboardIfUserExists}
              </li>
              {/* Renders profile or theme toggler if user is logged in */}
              <li>{profileOrThemeToggler}</li>
            </ul>
          </div>

          {/* MOBILE LIST OF LINKS */}
          <div className={styles.mobileNav}>
            <MobileNav navItems={mobileNavItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
