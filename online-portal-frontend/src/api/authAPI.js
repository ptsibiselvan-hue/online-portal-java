import api from './axiosInstance';

const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: (id) => api.get(`/auth/profile/${id}`),
  updateProfile: (id, userData) => api.put(`/auth/profile/${id}`, userData),
};

export default authAPI;
