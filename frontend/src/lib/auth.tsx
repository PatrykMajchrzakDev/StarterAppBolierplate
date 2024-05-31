// This file functionality is to provide auth through react-query-auth funcionality

// ========= MODULES ==========
import { z } from "zod";
import { configureAuth } from "react-query-auth";
import Cookies from "js-cookie";

import { AuthResponse, User } from "@/types/Auth/Auth";
import { api } from "./api-client";
import { useNotificationState } from "@/store/UI/NotificationStore";

// LOGOUT API CALL
const logout = async (): Promise<void> => {
  Cookies.remove("token");
  useNotificationState
    .getState()
    .setNotification(`User logged out successfully`, "success", "outlined");
};

// GET USER DATA API CALL
const getUser = (): Promise<User> => {
  return api.get("/auth/me");
};

// ================================
//  REGISTER INPUTS FORM VALIDATION
// ================================
export const signUpInputSchema = z
  .object({
    email: z.string().min(1, "Required").email("Invalid email address"),
    name: z.string().min(1, "Required"),
    password: z
      .string()
      .min(10, "Password should be at least 10 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;

// REGISTER API CALL
const registerWithEmailAndPassword = (
  data: SignUpInput
): Promise<AuthResponse> => {
  return api.post("/auth/register", data);
};

// ============================
// LOGIN INPUTS FORM VALIDATION
// ============================
export const signInInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email address"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});
export type SignInInput = z.infer<typeof signInInputSchema>;

// LOGIN API CALL
const loginWithEmailAndPassword = (
  data: SignInInput
): Promise<AuthResponse> => {
  return api.post("/auth/login", data);
};

// ============================
// ======= AUTH CONFIG ========
// === for react-query-auth ===

const authConfig = {
  userFn: getUser,
  loginFn: async (data: SignInInput) => {
    const response = await loginWithEmailAndPassword(data);
    Cookies.set("token", response.token, { expires: 7 });
    return response.user;
  },
  registerFn: async (data: SignUpInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
