// ============================
// ========= MODULES ==========
// ============================
import styles from "./scss/Layout.module.scss";
// ============================
// ======= COMPONENTS =========
// ============================
import Header from "@/components/Layout/Header/Header";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div id={styles.layout}>
      <Header />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Layout;
