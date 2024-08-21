// This components functionality is to show user settings

// ========= MODULES ==========
import CancelSubscription from "@/components/UI/UserSettings/Subscription/CancelSubscription";
import styles from "./styles/UserSettings.module.scss";

// ======= COMPONENTS =========
import { ChangeAvatar } from "@/components/UI/UserSettings/ChangeAvatar/ChangeAvatar";

const UserSettings = () => {
  return (
    <div id={styles.userSettings}>
      <span>User Settings Page</span>

      <div className={styles.changeAvatar}>
        <ChangeAvatar />
      </div>
      <CancelSubscription />
    </div>
  );
};

export default UserSettings;
