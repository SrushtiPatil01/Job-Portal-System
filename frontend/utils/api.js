import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  
  post: async (endpoint, data) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
};