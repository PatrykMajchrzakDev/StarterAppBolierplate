import { create } from "zustand";

interface NotificationState {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  variant: "filled" | "outlined" | "standard";
  open: boolean;
  color?: string;
  closeNotification: () => void;
  setNotification: (
    message: string,
    severity: "success" | "info" | "warning" | "error",
    variant: "filled" | "outlined" | "standard",
    color?: string
  ) => void;
}

export const useNotificationState = create<NotificationState>((set) => ({
  message: "",
  severity: "info",
  variant: "filled",
  open: false,
  setNotification: (message, severity, variant, color) =>
    set({ message, severity, variant, color, open: true }),
  closeNotification: () => set({ open: false }),
}));
