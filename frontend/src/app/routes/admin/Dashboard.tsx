// This components functionality is to display informations only available to admins

// ========= MODULES ==========
import { useState } from "react";

import styles from "./styles/Dashboard.module.scss";
import UserList from "./UserList";
import { Authorization, ROLES } from "@/lib/authorization";
import AccordionDrawer from "@/components/UI/AccordionDrawer/AccordionDrawer";
// ======= COMPONENTS =========

const AdminDashboard = () => {
  // This state sets object with key as argument passed to handleExpandPanel
  // and boolean as value to check if child component should be opened and content fetched
  const [expandedPanels, setExpandedPanels] = useState<{
    [key: string]: boolean;
  }>({});
  const handleExpandPanel =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanels((prevState) => ({
        ...prevState,
        [panel]: isExpanded,
      }));
    };
  return (
    <Authorization
      forbiddenFallback={<div>Only admin can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
    >
      <div className={styles.container}>
        <span>ADMIN DASHBOARD</span>
        <AccordionDrawer
          panelTitle="User List"
          panelName="userPanel"
          sx={{
            boxShadow:
              "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 2px rgba(0, 0, 0, 0.14), 0px 1px 3px 3px rgba(0, 0, 0, 0.12)",
          }}
          expanded={!!expandedPanels["userPanel"]}
          onChange={handleExpandPanel("userPanel")}
        >
          <UserList shouldFetch={!!expandedPanels["userPanel"]} />
        </AccordionDrawer>
      </div>
    </Authorization>
  );
};

export default AdminDashboard;
