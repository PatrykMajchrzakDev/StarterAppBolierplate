// ========= MODULES ==========
import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import styles from "./MainNav.module.scss";

import { useLogout, useUser } from "@/lib/auth";

// ======= COMPONENTS =========
import {
  Tooltip,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";

const MainNav = () => {
  const { data: user } = useUser();
  const logout = useLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ul className={styles.list}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      {user ? (
        <li>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {/* TBD HERE COULD BE USERS PROFILE PICTURE */}M
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/app/user-profile"
            >
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/app/user-profile/settings"
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout.mutate({});
                handleClose();
              }}
              component={Link}
              to="/"
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </li>
      ) : (
        <li>
          <Button variant="outlined" component={Link} to="/signin">
            Sign In
          </Button>
        </li>
      )}
    </ul>
  );
};

export default MainNav;

{
  /* <Button variant="outlined" onClick={() => logout.mutate({})}>
<Link to={"/"}>Logout</Link>
</Button> */
}
