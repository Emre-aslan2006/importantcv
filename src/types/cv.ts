
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  gpa?: string;
  honors?: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: Array<{ language: string; level: string }>;
  certifications: string[];
}

export interface Projects {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Projects[];
}

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
    certifications: []
  },
  projects: []
};
