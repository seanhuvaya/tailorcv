'use client';

import { useEffect, useState } from 'react';
import { useApi } from './useApi';
import { getStoredToken } from '@/lib/authToken';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface MeResponse {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

export function useAuth() {
  const api = useApi();
  const [user, setUser] = useState<MeResponse | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      if (!getStoredToken()) {
        setUser(null);
        setStatus('unauthenticated');
        return;
      }
      try {
        const res = await api.get<MeResponse>('/users/me');
        if (cancelled) return;
        setUser(res.data);
        setStatus('authenticated');
      } catch (err) {
        if (cancelled) return;
        setUser(null);
        setStatus('unauthenticated');
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [api]);

  return {
    user,
    status,
    isAuthenticated: status === 'authenticated',
  };
}