'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, Chrome, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE}/api/v1/auth/google/login`;
  };

  const handleGitHubSignIn = () => {
    window.location.href = `${API_BASE}/api/v1/auth/github/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Welcome to TailorCV</CardTitle>
          <CardDescription className="text-base">
            Get started with your AI-powered resume builder and track your applications with ease
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            size="lg"
            variant="outline"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
          <Button
            onClick={handleGitHubSignIn}
            className="w-full"
            size="lg"
            variant="outline"
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
          <p className="text-xs text-center text-muted-foreground pt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
