'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { getStoredToken } from '@/lib/authToken';

/**
 * Temporary debug page: open /auth/debug after logging in to verify token storage
 * and what the API receives. Remove in production.
 */
export default function AuthDebugPage() {
  const api = useApi();
  const [result, setResult] = useState<{
    tokenInStorage: boolean;
    tokenLength: number;
    debugAuth: Record<string, unknown> | null;
    error: string | null;
  } | null>(null);

  useEffect(() => {
    const token = getStoredToken();
    api
      .get('/debug/auth')
      .then((res) => res.data)
      .then((debugAuth) => {
        setResult({
          tokenInStorage: !!token,
          tokenLength: token?.length ?? 0,
          debugAuth,
          error: null,
        });
      })
      .catch((err) => {
        setResult({
          tokenInStorage: !!token,
          tokenLength: token?.length ?? 0,
          debugAuth: null,
          error: err.message || String(err),
        });
      });
  }, [api]);

  if (!result) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 font-mono text-sm max-w-2xl">
      <h1 className="text-lg font-bold mb-4">Auth debug (remove in prod)</h1>
      <pre className="bg-neutral-100 p-4 rounded whitespace-pre-wrap">
        {JSON.stringify(result, null, 2)}
      </pre>
      <p className="mt-4 text-muted-foreground">
        If token_present is false but tokenInStorage is true, the API is not receiving the Bearer header (check CORS, URL, proxy).
      </p>
    </div>
  );
}
