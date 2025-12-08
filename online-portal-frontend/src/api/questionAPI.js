import axios from "axios";

const API_BASE = "http://localhost:8081/api";

const questionAPI = {
  getByQuiz: (quizId) => axios.get(`${API_BASE}/questions/quiz/${quizId}`),
  getById: (id) => axios.get(`${API_BASE}/questions/${id}`),
  create: (data) => axios.post(`${API_BASE}/questions`, data),
  update: (id, data) => axios.put(`${API_BASE}/questions/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/questions/${id}`),
};

export default questionAPI;
