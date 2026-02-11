export interface Experience {
  id: string;
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  skill: string;
  category: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
}

export interface Project {
  id: string;
  name: string;
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
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
}

