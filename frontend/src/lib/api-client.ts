// ========= MODULES ==========
import Cookies from "js-cookie";
import Axios, { InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
// import { useNotifications } from "@/components/ui/notifications";

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
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Clear the token and redirect to the login page
      Cookies.remove("token");
      window.location.href = "/signin";
    }
    console.error("Something went wrong", error);
    return Promise.reject(error);
  }
  // TBD add notification ui
  // const message = error.response?.data?.message || error.message;
  // useNotifications.getState().addNotification({
  //   type: "error",
  //   title: "Error",
  //   message,
  // });
);
