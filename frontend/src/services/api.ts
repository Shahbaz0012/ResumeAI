import axios from "axios";

const api = axios.create({
  baseURL: "https://resumeai-y2cr.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // IMPORTANT:
  // FormData ke case mein Content-Type manually set nahi karna.
  // Browser automatically multipart/form-data + boundary set karega.
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default api;