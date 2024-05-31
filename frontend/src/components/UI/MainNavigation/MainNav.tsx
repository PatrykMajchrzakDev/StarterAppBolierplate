// ========= MODULES ==========
import { Link } from "react-router-dom";
import styles from "./MainNav.module.scss";

import { useLogout, useUser } from "@/lib/auth";

// ======= COMPONENTS =========
import Button from "@mui/material/Button";

const MainNav = () => {
  const { data: user } = useUser();
  const logout = useLogout();

  return (
    <ul className={styles.list}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      {user ? (
        <Button variant="outlined" onClick={() => logout.mutate({})}>
          <Link to={"/"}>Logout</Link>
        </Button>
      ) : (
        <Link to={"/signin"}>
          <Button variant="outlined">Sign In</Button>
        </Link>
      )}
    </ul>
  );
};

export default MainNav;
