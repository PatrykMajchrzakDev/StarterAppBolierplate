// ========= MODULES ==========

import { useNotificationState } from "@/store/UI/NotificationStore";
import ThemeStore from "@/store/Theme/ThemeStore";
// ======= COMPONENTS =========
import { Snackbar } from "@mui/material";
import Alert, { AlertProps } from "@mui/material/Alert";

interface NotificationProps {
  snackbarProps?: Omit<
    React.ComponentProps<typeof Snackbar>,
    "open" | "onClose"
  >;
  alertProps?: AlertProps;
  color?: string;
}

const Notification = ({ snackbarProps, alertProps }: NotificationProps) => {
  const { message, severity, variant, color, open, closeNotification } =
    useNotificationState();

  // Changes color of text based on current theme
  const theme = ThemeStore((state) => state.theme);
  const notifTextColor = theme === "light" ? "black" : "white";
  const notifBgColor = theme === "light" ? "white" : "#0f1214";

  return (
    <Snackbar
      open={open}
      autoHideDuration={1000 * 10} // 10 seconds
      onClose={closeNotification}
      {...snackbarProps}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{
        top: "120px",
        maxWidth: "400px",
        backgroundColor: notifBgColor || color,
      }}
    >
      <Alert
        onClose={closeNotification}
        severity={severity}
        variant={variant}
        {...alertProps}
        sx={{
          width: "100%",
          "& .MuiAlert-message": {
            fontSize: "16px",
            color: notifTextColor || color,
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
