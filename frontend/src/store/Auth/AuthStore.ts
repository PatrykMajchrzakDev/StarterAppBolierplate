import { create } from "zustand";
import { AuthState, User } from "@/types/Auth/Auth";
//TBD WHEN SERVER IS HOSTED
const authLoginURL = "http://localhost:3000/api/auth/login";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    const response = await fetch(authLoginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    const data = await response.json();
    const token = data.token;
    localStorage.setItem("token", token);

    const userData: User = await response.json();
    set({ user: userData, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
