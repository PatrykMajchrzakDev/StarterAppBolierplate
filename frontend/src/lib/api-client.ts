// ========= MODULES ==========
import Cookies from "js-cookie";
import Axios, { InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { useNotificationState } from "@/store/UI/NotificationStore";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  // by default get token from cookies
  const token = Cookies.get("token");

  if (config.headers) {
    config.headers.Accept = "application/json";
    // pass token to header when sending requests
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}

// base server url setup
export const api = Axios.create({
  baseURL: env.API_URL,
});

// use previously set headers setup
api.interceptors.request.use(authRequestInterceptor);

// handle response
api.interceptors.response.use(
  // if ok then just return response.data object
  (response) => response.data,

  // if error occurs then create notification with error.message
  (error) => {
    const message = error.response?.data?.error || error.message;
    useNotificationState
      .getState()
      .setNotification(message, "error", "outlined");

    return Promise.reject(error);
  }
);
