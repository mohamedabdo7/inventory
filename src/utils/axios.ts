import { API_URL } from "@/constants";
import authRoutes from "@/features/Auth/AuthRoutes";
import axios from "axios";

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any default headers here
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can modify request config here
    // Example: Add auth token
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

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // You can modify successful responses here
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("access_token");
          window.location.href = authRoutes.LOGIN;
          break;
        case 404:
          // Handle not found
          break;
        // Add more status handlers as needed
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("No response received:", error.request);
    }
    return Promise.reject(error);
  }
);

export default api;
