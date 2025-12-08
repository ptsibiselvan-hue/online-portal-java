import axios from 'axios';

const API_BASE = 'http://localhost:8081/api';

const categoryAPI = {
  getAll: () => axios.get(`${API_BASE}/categories`),
  getById: (id) => axios.get(`${API_BASE}/categories/${id}`),
  create: (categoryData) => axios.post(`${API_BASE}/categories`, categoryData),
  update: (id, categoryData) => axios.put(`${API_BASE}/categories/${id}`, categoryData),
  delete: (id) => axios.delete(`${API_BASE}/categories/${id}`),
};

export default categoryAPI;
