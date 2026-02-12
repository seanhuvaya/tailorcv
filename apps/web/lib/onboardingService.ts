import { api } from './apiClient';
import { BaseResume } from './types/resume';

export async function saveBaseResume(resume: BaseResume): Promise<{ success: boolean; message: string }> {
  await api.post('/onboarding/', resume);
  return { success: true, message: 'Base resume saved!' };
}


