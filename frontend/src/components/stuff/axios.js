import axios from "axios";
import { getToken } from "./helper";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
