// This components functionality is to display informations only available to admins

// ========= MODULES ==========
import { useState } from "react";

import styles from "./styles/Dashboard.module.scss";
import UserList from "./UserList";
import { Authorization, ROLES } from "@/lib/authorization";

// ======= COMPONENTS =========
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdminDashboard = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Authorization
      forbiddenFallback={<div>Only admin can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
    >
      <div className={styles.container}>
        <span>ADMIN DASHBOARD</span>
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              boxShadow:
                "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 2px rgba(0, 0, 0, 0.14), 0px 1px 3px 3px rgba(0, 0, 0, 0.12)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              List of users
            </AccordionSummary>
            <AccordionDetails>
              <UserList shouldFetch={expanded === "panel1"} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Authorization>
  );
};

export default AdminDashboard;
