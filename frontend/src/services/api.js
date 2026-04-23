import axios from 'axios';

const API_BASE_URL = 'https://ai-powered-phishing-simulation.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const campaignService = {
  getCampaigns: () => api.get('/campaigns'),
  createCampaign: (data) => api.post('/campaigns', data),
  getAnalytics: (id) => api.get(`/campaigns/analytics/${id}`),
  deleteCampaign: (id) => api.delete(`/campaigns/${id}`),
};

export const userService = {
  getUsers: () => api.get('/auth/users'), // Backend-integrated users list
};

export const trainingService = {
  completeTraining: (data) => api.post('/training/complete', data),
};

export default api;
