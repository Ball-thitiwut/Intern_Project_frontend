import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", 
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Session expired or unauthorized");
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

export default api;