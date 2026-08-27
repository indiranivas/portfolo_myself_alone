import type { PortfolioData } from '../types/portfolio'

export const fallbackPortfolioData: PortfolioData = {
  name: 'Indira Nivas',
  tagline:
    'Software Engineer Trainee & Forward Deployed Engineer | AI, enterprise software & real-world workflows',
  email: 'indiranivas123@gmail.com',
  phone: '9442535626',
  location: 'Namakkal, Tamil Nadu, India',
  linkedin: 'https://www.linkedin.com/in/indira-nivas-b7a869308/',
  github: 'https://github.com/indiranivas',
  interests: [
    'Enterprise AI Agents',
    'Human-in-the-Loop Systems',
    'Cloud & Enterprise Integrations',
  ],
  projects: [
    {
      name: 'AI-Powered Medical Recommendation System',
      description:
        'Developed an intelligent medical recommendation system integrating BioBERT for natural language symptom extraction and a Neo4j knowledge graph to predict probable diseases and suggest relevant specialists.',
      impact:
        'Improved symptom recognition accuracy by 30% and enabled real-time recommendations for 1000+ disease-symptom relationships.',
      tech: ['BioBERT', 'Neo4j', 'Python', 'NLP'],
      link: 'https://github.com/indiranivas/icliniq_4',
    },
    {
      name: 'Speed Limit Automation',
      description:
        'Designed and implemented a Vehicle Speed Control System using an FR module in an Internet of Things project.',
      impact: 'Increased safety compliance by 25% for vehicles operating at variable speeds.',
      tech: ['IoT', 'FR Module', 'Embedded Systems'],
    },
    {
      name: 'Vehicle Crash Detection',
      description: 'Designed an emergency alert system enabling cars to broadcast distress signals.',
      impact: 'Reduced accident response time by 40%.',
      tech: ['IoT', 'Emergency Systems', 'Wireless Communication'],
    },
  ],
  experience: [
    {
      role: 'Software Engineer Trainee / Forward Deployed Engineer (FDE)',
      company: 'LevelShift',
      period: 'March 2026 – Present',
      location: '',
      description: [
        'Building enterprise AI agents and RAG workflows that automate real business processes',
        'Designing human-in-the-loop handoffs and analyzing agent failures for reliability',
        'Shipping AI-assisted workflows across APIs, Azure, identity, and Dynamics 365',
        'Partnering with engineering and business stakeholders on demos, validation, and iteration',
      ],
      tech: ['AI Agents', 'RAG', 'Azure', 'Dynamics 365'],
    },
    {
      role: 'Intern - AI Powered Knowledge Graph',
      company: 'Icliniq',
      period: '2024 to 2025',
      location: '',
      description: [
        'Designed and implemented an AI-driven medical recommendation system integrating BioBERT for natural language symptom extraction',
        'Utilized Neo4j knowledge graphs to predict probable diseases and recommend specialists',
        'Improved healthcare decision-making through intelligent data processing',
      ],
      tech: ['BioBERT', 'Neo4j', 'Python', 'NLP'],
    },
    {
      role: 'Intern - OCR and Database Management',
      company: 'Universiti Sains Islam Malaysia',
      period: 'July 2024',
      location: 'Nilai, Malaysia',
      description: [
        'Developed OCR modules to extract structured data from medical reports, improving retrieval efficiency',
        'Automated database tasks, enhancing data accuracy and reducing manual errors',
      ],
      tech: ['OCR', 'Tesseract', 'Python', 'SQL'],
    },
  ],
  education: [
    {
      degree: 'B.Tech Artificial Intelligence and Data Science',
      institution: 'Coimbatore Institute of Technology',
      location: 'Coimbatore, India',
      period: '2022 to Present',
      cgpa: '7.43',
    },
  ],
  awards: [
    {
      title: '1st Place - Googlethon Hackathon',
      organization: 'Google Developer Student Club of CI',
      date: 'May 2024',
      description:
        'Secured first place with an IoT-based system that sends distress signals from vehicles to nearby cars in areas without cellular coverage, enhancing road safety and emergency response during accidents.',
      score: '',
      tags: [],
    },
    {
      title: 'Business Intelligence and Analytics',
      organization: 'NPTEL',
      date: 'June 2025',
      description:
        'Completed a comprehensive course covering data analysis, visualization techniques, and business intelligence strategies using tools like Power BI and Tableau.',
      score: 'Scored 81%',
      tags: [],
    },
  ],
  skills: {
    ai_agents: {
      title: 'AI & Agent Engineering',
      description:
        'LLMs, agent orchestration, RAG & search, reasoning, evaluation, telemetry, and human-in-the-loop handoffs — including agent types, SLAs, priorities, and cost trade-offs.',
      tech: [
        'LLMs',
        'AI Agents',
        'Agentic AI',
        'RAG',
        'Search',
        'Agent Orchestration',
        'Prompt Engineering',
        'Agent Evaluation',
        'Human-in-the-Loop',
        'AI Telemetry',
      ],
    },
    software: {
      title: 'Software Engineering',
      description:
        'REST APIs, backend services, authN/authZ, integrations, debugging, and testing across application and AI layers.',
      tech: [
        'Backend Development',
        'REST APIs',
        'API Integration',
        'Auth & Authorization',
        'Git',
        'Debugging',
        'Testing',
        'System Design',
      ],
    },
    cloud: {
      title: 'Cloud & DevOps',
      description:
        'Microsoft Azure, App Services, Azure DevOps CI/CD, Microsoft Entra ID, and enterprise SSO.',
      tech: [
        'Microsoft Azure',
        'Azure App Services',
        'Azure DevOps',
        'CI/CD',
        'Microsoft Entra ID',
        'SSO',
      ],
    },
    enterprise: {
      title: 'Enterprise & FDE',
      description:
        'Dynamics 365 and business-system integrations, requirements → solutions, demos, troubleshooting, and stakeholder collaboration.',
      tech: [
        'Dynamics 365',
        'Enterprise Integrations',
        'Workflow Automation',
        'Requirements Analysis',
        'Solution Engineering',
        'Technical Demos',
        'Stakeholder Collaboration',
      ],
    },
  },
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]
