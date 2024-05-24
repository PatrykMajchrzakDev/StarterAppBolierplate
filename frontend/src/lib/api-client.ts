// ============================
// ========= MODULES ==========
// ============================
import Axios, { InternalAxiosRequestConfig } from "axios";
// import { useNotifications } from "@/components/ui/notifications";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  return config;
}

export const api = Axios.create({
  baseURL: import.meta.env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // TBD add notification ui
    // const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: "error",
    //   title: "Error",
    //   message,
    // });
    console.error(error);

    return Promise.reject(error);
  }
);
