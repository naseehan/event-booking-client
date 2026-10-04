import axios from 'axios';
import { AUTH_TOKEN_KEY, AUTH_USERID_KEY } from '../utils/constants';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL,
  timeout: 12000, // 12 second fail-safe timeout against hanging connections
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: inject Bearer token and legacy userId header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userId = localStorage.getItem(AUTH_USERID_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (userId) {
      config.headers.userid = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: friendly error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected network error occurred.';

    if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Please check your connection and try again.';
    } else if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data?.error) {
      message = error.response.data.error;
    } else if (error.message) {
      message = error.message;
    }

    const enhancedError = new Error(message);
    enhancedError.originalError = error;
    enhancedError.status = error.response?.status;
    return Promise.reject(enhancedError);
  }
);

export default apiClient;
