// This file functionality is to provide auth through react-query-auth funcionality

// ========= MODULES ==========
import { z } from "zod";
import { configureAuth } from "react-query-auth";
import Cookies from "js-cookie";
import { queryOptions, useQuery, useMutation } from "@tanstack/react-query";

import { AuthResponse } from "@/types/Auth/Auth";
import { api } from "./api-client";
import { useNotificationState } from "@/store/UI/NotificationStore";
import { MutationConfig, QueryConfig } from "@/lib/react-query";
import { JSONMessageResponse } from "@/types/GenericResponse";

// LOGOUT API CALL
const logout = async (): Promise<void> => {
  Cookies.remove("token");
  useNotificationState
    .getState()
    .setNotification(`User logged out successfully`, "success", "outlined");
};

// GET USER DATA API CALL
const getUser = (): Promise<AuthResponse> => {
  return api.get("/auth/me");
};

// Options are set to be able to invalidate user data
// for example when avatar is changed to update new avatar
export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ["loggedInUser"],
    queryFn: getUser,
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
  });
};

// ================================
//  REGISTER INPUTS FORM VALIDATION
// ================================
export const signUpInputSchema = z
  .object({
    email: z.string().min(1, "Required").email("Invalid email address"),
    name: z
      .string()
      .min(4, "Should be 4 characters")
      .regex(/^[a-zA-Z0-9]*$/, "Name should not include special characters"),
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
  rememberMe: z.boolean().optional(),
});
export type SignInInput = z.infer<typeof signInInputSchema>;

// LOGIN API CALL
const loginWithEmailAndPassword = (
  data: SignInInput
): Promise<AuthResponse> => {
  return api.post("/auth/login", data);
};

// ===============================================
// ==== FORGOT PASSWORD INPUTS FORM VALIDATION ===
// ===============================================

// zod schema
export const forgotPasswordInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email address"),
});

export type forgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;

//FORGOT PASSWORD API CALL
export const forgotPassword = (
  data: forgotPasswordInput
): Promise<JSONMessageResponse> => {
  return api.post("/auth/forgot-password", data);
};

// Mutation config
type UseForgotPasswordOptions = {
  mutationConfig?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({
  mutationConfig,
}: UseForgotPasswordOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: forgotPassword,
  });
};

// ===============================================
// ==== RESET PASSWORD INPUTS FORM VALIDATION ====
// ===============================================

export const resetPasswordInputSchema = z
  .object({
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

export type resetPasswordInput = z.infer<typeof resetPasswordInputSchema>;

//RESET PASSWORD API CALL
export const resetPassword = (data: {
  formData: resetPasswordInput;
  resetToken: string | null;
}): Promise<JSONMessageResponse> => {
  return api.post("/auth/reset-password", data);
};

// Mutation config
type UseResetPasswordOptions = {
  mutationConfig?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({
  mutationConfig,
}: UseResetPasswordOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: resetPassword,
  });
};

// ==================================================
// === RESEND VERIFICATION EMAIL FORM VALIDATION ====
// ==================================================
export const resendVerificationEmailInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email address"),
});

export type resendEmailInput = z.infer<
  typeof resendVerificationEmailInputSchema
>;

//RESEND VERIFICATION EMAIL API CALL
export const resendVerificationEmail = (
  email: resendEmailInput
): Promise<JSONMessageResponse> => {
  return api.post("/auth/resend-verification-email", email);
};

// Mutation config
type UseResendVerificationEmail = {
  mutationConfig?: MutationConfig<typeof resendVerificationEmail>;
};

export const useResendVerificationEmail = ({
  mutationConfig,
}: UseResendVerificationEmail) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: resendVerificationEmail,
  });
};

// ============================
// ======= AUTH CONFIG ========
// === for react-query-auth ===
// ============================

const authConfig = {
  userFn: getUser,
  loginFn: async (data: SignInInput) => {
    const response = await loginWithEmailAndPassword(data);

    if (response.isrememberMe) {
      Cookies.set("token", response.token, { expires: 7 });
    } else {
      Cookies.set("token", response.token, { expires: 1 });
    }

    return { user: response.user, token: response.token };
  },
  registerFn: async (data: SignUpInput) => {
    const response = await registerWithEmailAndPassword(data);
    return { user: response.user, token: response.token };
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
