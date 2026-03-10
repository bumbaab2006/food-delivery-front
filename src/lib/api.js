import axios from "axios";

const fallbackApiUrl = "https://food-delivery-back-1-cev0.onrender.com";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || fallbackApiUrl
).replace(/\/+$/, "");

export const resolveApiUrl = (path = "") => {
  if (!path) {
    return API_BASE_URL;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const shouldRetry =
      error.config &&
      error.config.method === "get" &&
      !error.config.__retried &&
      ["ECONNABORTED", "ERR_NETWORK"].includes(error.code);

    if (!shouldRetry) {
      return Promise.reject(error);
    }

    error.config.__retried = true;
    return api(error.config);
  }
);
