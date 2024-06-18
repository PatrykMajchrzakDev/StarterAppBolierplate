// ========= MODULES ==========
import styles from "./scss/LandingLayout.module.scss";
import ThemeStore from "@/store/Theme/ThemeStore";

// ======= COMPONENTS =========
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import LandingHeader from "@/components/Layout/Header/LandingHeader/LandingHeader";
type Props = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  // get current MUI theme set in store
  const muiTheme = ThemeStore((state) => state.muiTheme);

  return (
    // Provide theme for MUI
    <ThemeProvider theme={muiTheme}>
      <div id={styles.layout}>
        {/* Always include Header */}
        <LandingHeader />

        {/* Render rest of the children */}
        <div className={styles.children}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default LandingLayout;
