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
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
