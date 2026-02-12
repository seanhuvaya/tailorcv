import axios, { AxiosInstance } from 'axios';
import { getStoredToken, clearStoredToken } from './authToken';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: `${API_BASE}/api/v1`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        clearStoredToken();
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
          window.location.replace('/auth');
        }
      }
      return Promise.reject(err);
    }
  );

  return instance;
}

export const api = createApiClient();
