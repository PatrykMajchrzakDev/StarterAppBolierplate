import { create } from "zustand";
import { lightTheme, darkTheme } from "@/config/themes";

// Define the store's state and actions using TypeScript interfaces
interface ThemeState {
  theme: string;
  muiTheme: any;
  toggleTheme: () => void;
}

const ThemeStore = create<ThemeState>((set, get) => ({
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light", // Initialize state from localStorage or default to 'light'
  muiTheme: localStorage.getItem("theme") === "dark" ? darkTheme : lightTheme,
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    const newMuiTheme = newTheme === "dark" ? darkTheme : lightTheme;
    set({ theme: newTheme, muiTheme: newMuiTheme });
    // Optionally update localStorage
    localStorage.setItem("theme", newTheme);
    // Optionally update DOM attribute if using for CSS variable-based theming
    document.documentElement.setAttribute("data-theme", newTheme);
  },
}));

export default ThemeStore;
