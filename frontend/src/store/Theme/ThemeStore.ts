import { create } from "zustand";
import { lightTheme, darkTheme } from "@/config/themes";

// Define the store's state and actions using TypeScript interfaces
interface ThemeState {
  theme: string;
  muiTheme: any;
  toggleTheme: () => void;
}

const ThemeStore = create<ThemeState>((set, get) => ({
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  muiTheme: localStorage.getItem("theme") === "dark" ? darkTheme : lightTheme,
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    const newMuiTheme = newTheme === "dark" ? darkTheme : lightTheme;
    set({ theme: newTheme, muiTheme: newMuiTheme });

    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  },
}));

export default ThemeStore;
