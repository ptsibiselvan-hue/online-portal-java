import axios from "axios";

const API_BASE = "http://localhost:8081/api";

const resultAPI = {
  submitResult: (data) => axios.post(`${API_BASE}/results/submit`, data),
  getUserResults: (userId) => axios.get(`${API_BASE}/results/user/${userId}`),
  getResultDetail: (resultId) => axios.get(`${API_BASE}/results/detail/${resultId}`)
};

export default resultAPI;
