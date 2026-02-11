import { BaseResume } from './types/resume';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function postBaseResume(resume: BaseResume): Promise<Response> {
  return fetch(`${API_BASE}/api/v1/onboarding/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resume),
  });
}

export async function saveBaseResume(resume: BaseResume): Promise<{ success: boolean; message: string }> {
  const res = await postBaseResume(resume);

  if (!res.ok) {
    throw new Error('Failed to save base resume');
  }

  return { success: true, message: 'Base resume saved!' };
}


