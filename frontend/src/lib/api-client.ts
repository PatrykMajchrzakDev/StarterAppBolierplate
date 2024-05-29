// ========= MODULES ==========
import Cookies from "js-cookie";
import Axios, { InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { useNotificationState } from "@/store/UI/NotificationStore";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = Cookies.get("token");
  if (config.headers) {
    config.headers.Accept = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message;
    useNotificationState
      .getState()
      .setNotification(message, "error", "outlined");

    return Promise.reject(error);
  }
);
