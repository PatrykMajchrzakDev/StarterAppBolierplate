// This component functionality is to display footer for landing page

// ========= MODULES ==========
import styles from "./LandingFooter.module.scss";
import { Link as RouterLink } from "react-router-dom";

import ThemeStore from "@/store/Theme/ThemeStore";

// ======= COMPONENTS =========
import logo from "@/assets/img/logo.png";
import logoDM from "@/assets/img/logo-dm.png";
import {
  Box,
  Divider,
  Fab,
  IconButton,
  Link,
  Paper,
  Tooltip,
} from "@mui/material";
import { ArrowUpward, GitHub, LinkedIn, WebAsset } from "@mui/icons-material";
import Copyright from "@/components/UI/Copyright/Copyright";

const LandingFooter = () => {
  // Fn to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Change logo based on current theme
  const theme = ThemeStore((state) => state.theme);

  return (
    <footer id={styles.footer}>
      {/* UPPER SECTION */}
      <div className={`${styles.upperSection} container`}>
        {/* LOGO */}
        <img
          src={theme === "light" ? logo : logoDM}
          alt="logo"
          className={styles.logo}
          loading="lazy"
          decoding="async"
          width="290px"
          height="52px"
        />

        {/* GO UP ARROW */}
        <Box className={styles.jumpToTop}>
          <Fab color="primary" aria-label="goUp" onClick={scrollToTop}>
            <ArrowUpward className={styles.moveUpDown} />
          </Fab>
        </Box>

        {/* LINKS CONTAINER */}
        <div className={styles.quickLinks}>
          <span className={styles.title}>Quick Links</span>
          <div className={styles.links}>
            <Link to={"/signin"} component={RouterLink}>
              Sign In
            </Link>
            <Link to={"/signup"} component={RouterLink}>
              Sign Up
            </Link>
            <Link to={"/forgotpassword"} component={RouterLink}>
              Forgot password
            </Link>
            <Link to={"/resendemail"} component={RouterLink}>
              Something
            </Link>
          </div>
        </div>
      </div>
      <Divider className="container" sx={{ margin: "0 auto" }} />

      {/* LOWER SECTION */}
      <div className={`${styles.lowerSection} container`}>
        {/* SOCIAL LINKS */}
        <div className={styles.socialLinks}>
          <Tooltip title="GitHub">
            <IconButton aria-label="github" size="large">
              <Link
                to={"https://github.com/PatrykMajchrzakDev"}
                component={RouterLink}
              >
                <GitHub fontSize="large" />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <IconButton aria-label="linkedin" size="large">
              <Link
                to={"https://www.linkedin.com/in/patryk-majchrzakdev/"}
                component={RouterLink}
              >
                <LinkedIn fontSize="large" />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Portfolio">
            <IconButton aria-label="portfolio" size="large">
              <Link
                to={"https://patrykmajchrzakdev.vercel.app/"}
                component={RouterLink}
              >
                <WebAsset fontSize="large" />
              </Link>
            </IconButton>
          </Tooltip>
        </div>

        {/* MADE BY ME */}
        <span>
          Made by{" "}
          <Link href="https://www.linkedin.com/in/patryk-majchrzakdev/">
            Patryk Majchrzak
          </Link>
        </span>

        {/* COPYRIGHT */}
        <Copyright />
      </div>
    </footer>
  );
};

export default LandingFooter;
