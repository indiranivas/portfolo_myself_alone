export interface Award {
  title: string
  organization: string
  date: string
  description: string
  score?: string
  tags: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  cgpa: string
}

export interface Experience {
  role: string
  company: string
  period: string
  location: string
  description: string[]
  tech: string[]
}

export interface Project {
  name: string
  description: string
  impact: string
  tech: string[]
  link?: string
}

export interface SkillCategory {
  title: string
  description: string
  tech: string[]
}

export interface PortfolioData {
  name: string
  tagline: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  interests: string[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  awards: Award[]
  skills: Record<string, SkillCategory>
}
