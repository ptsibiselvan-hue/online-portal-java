import axios from "axios";

const API_BASE = "http://localhost:8081/api/admin/results";

const adminResultAPI = {
  getAll: () => axios.get(`${API_BASE}`),
  getByUser: (userId) => axios.get(`${API_BASE}/user/${userId}`),
  getByQuiz: (quizId) => axios.get(`${API_BASE}/quiz/${quizId}`),
  getDetail: (resultId) => axios.get(`${API_BASE}/detail/${resultId}`)
};

export default adminResultAPI;
