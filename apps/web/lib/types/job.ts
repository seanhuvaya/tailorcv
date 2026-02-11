export type JobStatus = 'pending' | 'applied' | 'interview' | 'rejected' | 'accepted';

export interface TailoredJob {
  id: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  tailoredResume: string;
  status: JobStatus;
  dateCreated: string;
  dateApplied?: string;
}

