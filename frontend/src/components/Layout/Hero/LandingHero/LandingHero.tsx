// This component functionality is to display landing hero

// ========= MODULES ==========
import styles from "./LandingHero.module.scss";
import { Link as RouterLink } from "react-router-dom";

// ======= COMPONENTS =========
import heroImg from "@/assets/img/hero.png";
import heroImgMobile from "@/assets/img/hero-m.png";
import heroBG from "@/assets/img/herobg.png";
import { Button, Link } from "@mui/material";
function LandingHero() {
  return (
    <section id={styles.hero}>
      <picture className={styles.bgImg}>
        <img
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          src={heroBG}
          alt="hero-background"
          width="1440"
          height="550"
        />
      </picture>

      {/* ===============================
          ========== HERO TEXT ==========
          =============================== */}
      <div className={styles.heroText}>
        <h1 className="title">
          <span className={styles.titleDistinction}>Save time</span> and{" "}
          <span className={styles.titleDistinction}>build</span> <br /> your
          next app <span className={styles.titleDistinction}>faster</span>
        </h1>
        <h2 className="textScalable">
          Built with passion and thought about you <br /> to save your time and
          make your next app faster
        </h2>
        <Link component={RouterLink} to={"/signup"}>
          <Button
            variant="contained"
            className={styles.signInButton}
            sx={{ backgroundColor: "#7d50ff" }}
          >
            Sign Up free
          </Button>
        </Link>
      </div>

      {/* ===============================
          =========== HERO IMG ==========
          =============================== */}
      <div className={styles.heroImgContainer}>
        <picture>
          <source media="(max-width: 600px)" srcSet={heroImgMobile} />
          <source media="(min-width: 601px)" srcSet={heroImg} />
          <img src={heroImg} alt="hero" className={styles.heroImg} />
        </picture>
      </div>
    </section>
  );
}

export default LandingHero;
