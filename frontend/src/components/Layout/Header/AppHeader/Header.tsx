// This component functionality is to header - logo, theme toggler and navigation for main app

// ============================
// ========= MODULES ==========
// ============================
import { ReactNode } from "react";
import styles from "./Header.module.scss";
import { Link as RouterLink, useLocation } from "react-router-dom";

// ============================
// ======= COMPONENTS =========
// ============================

import logo from "@/assets/img/logo.png";
import logoDM from "@/assets/img/logo-dm.png";

import MobileNav from "@/components/UI/MobileNavigation/MobileNav";
import ThemeStore from "@/store/Theme/ThemeStore";
import UserProfileTooltip from "@/components/UI/User/UserProfileTooltip";
import { useLogout, useUser } from "@/lib/auth";

import { Link } from "@mui/material";
import { Home, Logout } from "@mui/icons-material";

type navItemProps = {
  path: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

const appNavItems: navItemProps[] = [
  {
    path: "/app",
    label: "Dashboard",
    icon: <Home />,
  },
  {
    path: "/app/user-profile/settings",
    label: "Settings",
    icon: <Home />,
  },
  {
    path: "/",
    label: "Landing",
    icon: <Home />,
  },
];

const Header = () => {
  const { data: user } = useUser();
  const logout = useLogout();
  const theme = ThemeStore((state) => state.theme);
  const location = useLocation();

  const mobileNavItems: navItemProps[] = [
    { path: "/app", label: "Dashboard", icon: <Home /> },
    {
      path: "/logout",
      label: "Logout",
      icon: <Logout />,
      onClick: () => {
        logout.mutate({});
      },
    },
  ];

  // Set class based on current location
  const isActive = (path: string) => location.pathname === path;
  return (
    <div id={styles.header}>
      <div className={styles.wrapper}>
        {/* LOGO */}
        <RouterLink to="/app" className={styles.logo}>
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
              {appNavItems.map((item) => (
                <li
                  key={item.label}
                  className={isActive(item.path) ? styles.isActive : ""}
                >
                  <Link component={RouterLink} to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {user && user.user && <UserProfileTooltip />}
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
export default Header;
