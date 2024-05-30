export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

// Props user object hold
export type User = Entity<{
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "MOD";
  token: string;
}>;

// Object returned if auth is success
export type AuthResponse = {
  token: string;
  user: User;
};

// Used for auth configuration react-query-auth
export interface AuthState {
  user: User | null;
  token: string | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}
