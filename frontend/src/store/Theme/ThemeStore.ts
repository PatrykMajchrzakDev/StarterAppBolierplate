import { create } from "zustand";
import { lightTheme, darkTheme } from "@/config/themes";
import { Theme } from "@mui/material/styles";

// Define the store's state and actions using TypeScript interfaces
interface ThemeState {
  theme: string;
  muiTheme: Theme;
  toggleTheme: () => void;
}

const ThemeStore = create<ThemeState>((set, get) => ({
  // Get themes from store and if there is none then set to light
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  muiTheme: localStorage.getItem("theme") === "dark" ? darkTheme : lightTheme,

  // fn to toggle theme
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    const newMuiTheme = newTheme === "dark" ? darkTheme : lightTheme;
    set({ theme: newTheme, muiTheme: newMuiTheme });

    // when theme toggled then update theme in localstorage
    localStorage.setItem("theme", newTheme);
    // add attribute to <html> tag
    document.documentElement.setAttribute("data-theme", newTheme);
  },
}));

export default ThemeStore;
