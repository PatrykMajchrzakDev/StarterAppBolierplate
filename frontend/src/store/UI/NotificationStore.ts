import { create } from "zustand";

interface NotificationState {
  // props that notification might accept
  message: string;
  severity: "success" | "error" | "warning" | "info";
  variant: "filled" | "outlined" | "standard";
  open: boolean;
  color?: string;

  // fns that notification accepts
  closeNotification: () => void;
  setNotification: (
    message: string,
    severity: "success" | "info" | "warning" | "error",
    variant: "filled" | "outlined" | "standard",
    color?: string
  ) => void;
}

export const useNotificationState = create<NotificationState>((set) => ({
  // default props
  message: "",
  severity: "info",
  variant: "filled",
  open: false,

  // fn to update default props
  setNotification: (message, severity, variant, color) =>
    set({ message, severity, variant, color, open: true }),

  // toggle notification visibility
  closeNotification: () => set({ open: false }),
}));
