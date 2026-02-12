'use client';

import type { AxiosInstance } from 'axios';
import { api } from '@/lib/apiClient';

/** Returns the shared API client. Use in components when you need the authenticated client. */
export function useApi(): AxiosInstance {
  return api;
}