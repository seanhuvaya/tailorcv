'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface MeResponse {
  id: string;
  // extend with more fields from /users/me as needed
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, status } = useAuth();

  // 2. Guard: redirect based on auth + onboarding/base resume state
  useEffect(() => {
    if (status === 'loading') return;

    // Not logged in → marketing / auth entry
    if (!isAuthenticated) {
      router.replace('/landing');
      return;
    }

    // Logged in: decide between dashboard vs onboarding based on stored base resume
    if (user) {
      const userId = user.id;
      const baseResume = typeof window !== 'undefined'
        ? window.localStorage.getItem(`resume_${userId}`)
        : null;

      if (baseResume) {
        router.replace('/dashboard');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [user, status, router]);

  // Guard screen: simple loading state while we decide where to send the user
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-50">
      <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
    </div>
  );
}
