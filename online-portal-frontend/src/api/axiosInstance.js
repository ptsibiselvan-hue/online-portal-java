// src/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8081/api',
  // If you plan to use cookies (session auth), enable this:
  // withCredentials: true,
  timeout: 10000
});

// Optional: request interceptor to add auth token (if you add JWT later)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or from redux store
  if (token) config.headers.Authorization = token;
  return config;
}, (error) => Promise.reject(error));

// Optional: response interceptor for central error handling
instance.interceptors.response.use(
  res => res,
  err => {
    // You can centralize 401/403 handling here
    return Promise.reject(err);
  }
);

export default instance;
