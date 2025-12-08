import axios from 'axios';

const API_BASE = 'http://localhost:8081/api';

const quizAPI = {
  getAll: () => axios.get(`${API_BASE}/quizzes`),
  getById: (id) => axios.get(`${API_BASE}/quizzes/${id}`),
  getByCategory: (categoryId) => axios.get(`${API_BASE}/quizzes/category/${categoryId}`),
  create: (quizData) => axios.post(`${API_BASE}/quizzes`, quizData),
  update: (id, quizData) => axios.put(`${API_BASE}/quizzes/${id}`, quizData),
  delete: (id) => axios.delete(`${API_BASE}/quizzes/${id}`),
};

export default quizAPI;
