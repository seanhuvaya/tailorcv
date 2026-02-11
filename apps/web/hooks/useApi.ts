// apps/web/hooks/useApi.ts
'use client';

import { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export function useApi(): AxiosInstance {
  const api = useMemo(() => {
    return axios.create({
      baseURL: `${API_BASE}/api/v1`,
      withCredentials: true, // sends the access_token cookie on every request
    });
  }, []);

  return api;
}