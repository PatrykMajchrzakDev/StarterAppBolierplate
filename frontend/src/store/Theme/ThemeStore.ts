import { create } from "zustand";
import { lightTheme, darkTheme } from "@/config/themes";
import { Theme } from "@mui/material/styles";

// Define the store's state and actions using TypeScript interfaces
interface ThemeState {
  theme: "light" | "dark";
  muiTheme: Theme;
  toggleTheme: () => void;
}

const getInitialTheme = (): "light" | "dark" => {
  return (localStorage.getItem("theme") as "light" | "dark") || "light";
};

const getInitialMuiTheme = (theme: "light" | "dark"): Theme => {
  return theme === "dark" ? darkTheme : lightTheme;
};

const initialTheme = getInitialTheme();
const initialMuiTheme = getInitialMuiTheme(initialTheme);

// Set the initial data-theme attribute
document.documentElement.setAttribute(
  "data-theme",
  initialMuiTheme.palette.mode
);

const ThemeStore = create<ThemeState>((set, get) => ({
  theme: initialTheme,
  muiTheme: initialMuiTheme,
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    const newMuiTheme = getInitialMuiTheme(newTheme);

    set({ theme: newTheme, muiTheme: newMuiTheme });
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute(
      "data-theme",
      newMuiTheme.palette.mode
    );
  },
}));

export default ThemeStore;
