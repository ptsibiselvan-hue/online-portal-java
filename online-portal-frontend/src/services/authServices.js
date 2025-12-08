import axios from 'axios';

const API_BASE = 'http://localhost:8081/api';

const authAPI = {
  register: (userData) => axios.post(`${API_BASE}/auth/register`, userData),
  login: (credentials) => axios.post(`${API_BASE}/auth/login`, credentials),
  getProfile: (userId) => axios.get(`${API_BASE}/auth/profile/${userId}`),
  updateProfile: (userId, userData) => axios.put(`${API_BASE}/auth/profile/${userId}`, userData),
};

export default authAPI;
