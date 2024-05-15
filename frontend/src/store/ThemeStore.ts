import { create } from "zustand";

// Define the store's state and actions using TypeScript interfaces
interface ThemeState {
  theme: string;
  toggleTheme: () => void;
}

const ThemeStore = create<ThemeState>((set, get) => ({
  theme: localStorage.getItem("theme") || "light", // Initialize state from localStorage or default to 'light'
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: newTheme });
    // Optionally update localStorage
    localStorage.setItem("theme", newTheme);
    // Optionally update DOM attribute if using for CSS variable-based theming
    document.documentElement.setAttribute("data-theme", newTheme);
  },
}));

export default ThemeStore;
