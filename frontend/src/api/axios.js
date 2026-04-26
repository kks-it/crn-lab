import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("crnLabAuth");
  if (!stored) {
    return config;
  }

  const auth = JSON.parse(stored);
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

export default api;
