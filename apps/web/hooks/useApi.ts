'use client';

import { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { getStoredToken } from '@/lib/authToken';
import { clearStoredToken } from '@/lib/authToken';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export function useApi(): AxiosInstance {
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: `${API_BASE}/api/v1`,
      withCredentials: true,
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
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, []);

  return api;
}