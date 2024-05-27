// ========= MODULES ==========
import styles from "./scss/Layout.module.scss";
import ThemeStore from "@/store/Theme/ThemeStore";

// ======= COMPONENTS =========
import Header from "@/components/Layout/Header/Header";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const muiTheme = ThemeStore((state) => state.muiTheme);
  return (
    <ThemeProvider theme={muiTheme}>
      <div id={styles.layout}>
        <Header />
        <div className={styles.children}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
