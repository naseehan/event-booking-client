import apiClient from './client';

export const authApi = {
  signup: async (email, password) => {
    const response = await apiClient.post('/signup', { email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/logout');
    return response.data;
  },
};
