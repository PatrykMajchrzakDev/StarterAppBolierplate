// This components functionality is to

// ========= MODULES ==========
import styles from "./styles/UserSettings.module.scss";

// ======= COMPONENTS =========
import { ChangeAvatar } from "@/components/UI/UserSettings/ChangeAvatar/ChangeAvatar";

const UserSettings = () => {
  return (
    <div>
      <span>User Settings Page</span>

      <div className={styles.changeAvatar}>
        <ChangeAvatar />
      </div>
    </div>
  );
};

export default UserSettings;
