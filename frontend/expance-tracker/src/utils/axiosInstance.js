import axios from "axios";

import { BASE_URI } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URI,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.message.status === 500) {
        console.log("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Requested timeout. Please try again.");
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
