// ========= MODULES ==========
import { useState, useCallback, useRef, useEffect, ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styles from "./MobileNav.module.scss";

// ======= COMPONENTS =========
import { Divider, Link } from "@mui/material";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { Menu } from "@mui/icons-material";

type navItem = {
  path: string;
  label: string;
  icon: ReactNode;
};

type MobileNavProps = {
  navItems: navItem[];
};

const MobileNav = ({ navItems }: MobileNavProps) => {
  const location = useLocation();
  // State to manage the visibility of the mobile nav
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Reference to the nav container element
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Toggles the mobile nav open/closed state
  const toggleNavOpen = useCallback(() => {
    setIsMobileNavOpen((prevState) => !prevState);
  }, []);

  // Closes the nav if a click happens outside of the nav container
  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (
      navContainerRef.current &&
      !navContainerRef.current.contains(event.target as Node)
    ) {
      setIsMobileNavOpen(false);
    }
  }, []);

  // Effect to add/remove event listeners for detecting outside clicks
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchstart", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("touchstart", handleDocumentClick);
    };
  }, [handleClickOutside]);

  // Set class based on current location
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav id={styles.navigation}>
      <Menu onClick={toggleNavOpen} fontSize="large" sx={{ margin: "1rem" }} />

      <div
        ref={navContainerRef}
        className={`${styles.navContainer} ${
          isMobileNavOpen ? styles.open : ""
        }`}
      >
        <div className={styles.actionsContainer}>
          <div className={styles.themeToggler}>
            {/* tutaj dodac UserProfileTooltip */}
            <ThemeToggler id="2" />
          </div>

          <Divider />
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li
                key={item.label}
                className={isActive(item.path) ? styles.isActive : ""}
              >
                <Link component={RouterLink} to={item.path}>
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
