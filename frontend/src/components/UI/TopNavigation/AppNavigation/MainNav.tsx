// ========= MODULES ==========
import styles from "./MainNav.module.scss";

import { useUser } from "@/lib/auth";
// ======= COMPONENTS =========
import UserProfileTooltip from "../../User/UserProfileTooltip";

const MainNav = () => {
  const { data: user } = useUser();

  return (
    <ul className={styles.list}>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      {user && user.user && <UserProfileTooltip />}
    </ul>
  );
};

export default MainNav;
