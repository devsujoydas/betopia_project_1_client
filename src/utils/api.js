// frontend/src/api.js
import axios from "axios";
import { Navigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Please login again.");
      Navigate("/auth/login")
    }
    return Promise.reject(error);
  }
);

export default api;
