// apps/web/hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface MeResponse {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export function useAuth() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        const res = await axios.get<MeResponse>(`${API_BASE}/api/v1/users/me`, {
          withCredentials: true, // sends HTTP-only access_token cookie
        });
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
  }, []);

  return {
    user,
    status,
    isAuthenticated: status === 'authenticated',
  };
}