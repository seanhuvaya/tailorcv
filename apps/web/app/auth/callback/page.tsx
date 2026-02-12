'use client';

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { setStoredToken } from '@/lib/authToken';

export default function AuthCallbackPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    let token = params.get('access_token');

    // Normalize: query params can turn + into space; decode if double-encoded
    if (token) {
      try {
        token = decodeURIComponent(token);
      } catch {
        // already decoded
      }
      token = token.replace(/ /g, '+');
    }

    // JWT has 3 base64 parts separated by dots
    const looksLikeJwt = token && token.split('.').length === 3;

    if (token && looksLikeJwt) {
      try {
        setStoredToken(token);
      } catch (e) {
        console.error('Failed to store auth token', e);
      }
      window.location.replace('/dashboard');
    } else {
      if (!token) console.warn('[auth/callback] No access_token in URL');
      else console.warn('[auth/callback] access_token does not look like a JWT');
      window.location.replace('/auth');
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-50">
      <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
    </div>
  );
}
