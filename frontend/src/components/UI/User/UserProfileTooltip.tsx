import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogout, useUser } from "@/lib/auth";
// import useUserAvatarStore from "@/store/User/user-avatar";
// ======= COMPONENTS =========
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";

const UserProfileTooltip = () => {
  // Get user info
  const { data: user } = useUser();
  // Logout fn
  const logout = useLogout();

  // Close when clicked on item or outside of tooltip
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user?.user.avatarUrl);
  const adminNavigation =
    user?.user.role === "ADMIN" ? (
      <MenuItem
        onClick={handleClose}
        component={Link}
        to="/app/user-profile/admin"
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Admin Dashboard
      </MenuItem>
    ) : (
      ""
    );
  return (
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
          <Avatar
            sx={{
              width: 32,
              height: 32,
              img: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            }}
          >
            {(user?.user.avatarUrl != null && (
              <img src={user?.user.avatarUrl} />
            )) ||
              user?.user.name[0]}
          </Avatar>{" "}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // this is removed cause clicking on name closed menu
        // onClick={handleClose}
        slotProps={{
          paper: {
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
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* AVATAR */}
        <MenuItem>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              img: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            }}
          >
            {(user?.user.avatarUrl != null && (
              <img src={user?.user.avatarUrl} />
            )) ||
              user?.user.name[0]}
          </Avatar>{" "}
          {user?.user.name}
        </MenuItem>
        <Divider />

        {/* SETTINGS */}
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

        {/* REST ITEMS IS FOR ADMINS */}
        {adminNavigation}

        {/* LOGOUT */}
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
  );
};

export default UserProfileTooltip;
