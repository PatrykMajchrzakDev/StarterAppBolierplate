export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
