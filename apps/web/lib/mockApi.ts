export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  githubLink: string;
  websiteLink: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface BaseResume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects?: Project[];
  certifications?: Certification[];
}

export interface TailoredJob {
  id: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  tailoredResume: string;
  status: 'pending' | 'applied' | 'interview' | 'rejected' | 'accepted';
  dateCreated: string;
  dateApplied?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async saveBaseResume(resume: BaseResume): Promise<{ success: boolean; message: string }> {
    await delay(1500);
    localStorage.setItem('baseResume', JSON.stringify(resume));
    return { success: true, message: 'Base resume saved!' };
  },

  async getBaseResume(): Promise<BaseResume | null> {
    await delay(800);
    const stored = localStorage.getItem('baseResume');
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  },

  async tailorResume(jobDescription: string, baseResume: BaseResume): Promise<{ tailoredResume: string }> {
    await delay(2000);

    const tailoredResume = `# ${baseResume.personalInfo.fullName}
## ${jobDescription.split('\n')[0] || 'Professional'}

**Contact**
${baseResume.personalInfo.email} | ${baseResume.personalInfo.phone} | ${baseResume.personalInfo.location}
${baseResume.personalInfo.linkedin ? `LinkedIn: ${baseResume.personalInfo.linkedin}` : ''}
${baseResume.personalInfo.github ? `GitHub: ${baseResume.personalInfo.github}` : ''}

**Professional Summary**
${baseResume.summary} Tailored expertise aligns perfectly with the requirements for this position, bringing proven success in delivering high-impact solutions and driving measurable results.

**Experience**

${baseResume.experiences.map(exp => `**${exp.position}** | ${exp.company}
${exp.startDate} - ${exp.endDate}

${exp.description.map(desc => `• ${desc} (Optimized for role requirements)`).join('\n')}
`).join('\n')}

**Education**

${baseResume.education.map(edu => `**${edu.degree}** in ${edu.field}
${edu.school} | Graduated: ${edu.graduationDate}`).join('\n\n')}

**Technical Skills**

${baseResume.skills.join(' • ')}

**Key Achievements Relevant to This Role**
• Successfully delivered projects matching the job requirements
• Demonstrated expertise in the core technologies mentioned in the job description
• Proven track record of collaboration and team leadership`;

    return { tailoredResume };
  },

  async trackJob(job: Omit<TailoredJob, 'id' | 'dateCreated'>): Promise<{ success: boolean; jobId: string }> {
    await delay(1000);

    const jobId = `job_${Date.now()}`;
    const newJob: TailoredJob = {
      ...job,
      id: jobId,
      dateCreated: new Date().toISOString(),
    };

    const existingJobs = this.getTrackedJobsSync();
    existingJobs.unshift(newJob);
    localStorage.setItem('trackedJobs', JSON.stringify(existingJobs));

    return { success: true, jobId };
  },

  getTrackedJobsSync(): TailoredJob[] {
    const stored = localStorage.getItem('trackedJobs');
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getMockJobs();
  },

  async getTrackedJobs(): Promise<TailoredJob[]> {
    await delay(800);
    return this.getTrackedJobsSync();
  },

  async updateJobStatus(jobId: string, status: TailoredJob['status']): Promise<{ success: boolean }> {
    await delay(500);
    const jobs = this.getTrackedJobsSync();
    const jobIndex = jobs.findIndex(j => j.id === jobId);

    if (jobIndex !== -1) {
      jobs[jobIndex].status = status;
      if (status === 'applied') {
        jobs[jobIndex].dateApplied = new Date().toISOString();
      }
      localStorage.setItem('trackedJobs', JSON.stringify(jobs));
    }

    return { success: true };
  },

  getMockJobs(): TailoredJob[] {
    return [
      {
        id: 'job_1',
        jobTitle: 'Senior Data Engineer',
        company: 'TechCorp Inc',
        jobDescription: 'Looking for a Senior Data Engineer with expertise in Python, Spark, and AWS...',
        tailoredResume: '# John Doe\n## Senior Data Engineer\n\nTailored resume content...',
        status: 'applied',
        dateCreated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dateApplied: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'job_2',
        jobTitle: 'Machine Learning Engineer',
        company: 'AI Solutions Ltd',
        jobDescription: 'Seeking ML Engineer with experience in NLP and deep learning...',
        tailoredResume: '# John Doe\n## ML Engineer\n\nTailored resume content...',
        status: 'interview',
        dateCreated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        dateApplied: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'job_3',
        jobTitle: 'Data Platform Architect',
        company: 'DataFlow Systems',
        jobDescription: 'Architect needed for building scalable data platforms...',
        tailoredResume: '# John Doe\n## Data Platform Architect\n\nTailored resume content...',
        status: 'pending',
        dateCreated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  },
};
