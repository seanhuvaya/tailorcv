'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, FileText, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  applied: 'bg-blue-100 text-blue-800 border-blue-200',
  interview: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, status, isAuthenticated } = useAuth();

 

  if (status === 'loading') {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth');
    return null;
  }
  if (!user?.is_onboarded) {
    router.push('/onboarding');
    return null;
  }

  return (
    <div className="p-6 pb-24 md:pb-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          Welcome back, {user?.name || 'there'}!
        </h1>
        <p className="mt-2 text-neutral-600">
          Track your applications and tailor resumes for new opportunities
        </p>
      </div>

      {/* <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-neutral-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applied}</div>
            <p className="text-xs text-neutral-500">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <TrendingUp className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews}</div>
            <p className="text-xs text-neutral-500">In progress</p>
          </CardContent>
        </Card>
      </div> */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Recent Applications</h2>
        <Link href="/dashboard/tailor">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Tailoring
          </Button>
        </Link>
      </div>

      {/* {jobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-neutral-300 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              No applications yet
            </h3>
            <p className="text-neutral-600 text-center mb-6 max-w-md">
              Start tailoring your resume for specific jobs and track your applications
            </p>
            <Link href="/dashboard/tailor">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Tailored Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{job.jobTitle}</CardTitle>
                    <CardDescription className="mt-1">{job.company}</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={statusColors[job.status]}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm text-neutral-600">
                  <div className="flex items-center justify-between">
                    <span>Created: {format(new Date(job.dateCreated), 'MMM d, yyyy')}</span>
                    {job.dateApplied && (
                      <span>Applied: {format(new Date(job.dateApplied), 'MMM d, yyyy')}</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/dashboard/applications/${job.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )} */}
    </div>
  );
}
