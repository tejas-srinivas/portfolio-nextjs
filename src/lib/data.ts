// src/lib/data.ts
// All static content for the portfolio. Section components import from here.
// Never hardcode strings in JSX — add content here instead.

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string;
  roles: string[]; // used by hero typewriter role cycling
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  metric: string;
  github?: string;
  featured: boolean;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  cloud: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export const personalInfo: PersonalInfo = {
  name: "Tejas Srinivasulu",
  role: "Full Stack Engineer",
  location: "Bangalore, Karnataka",
  email: "stejas2002@gmail.com",
  linkedin: "https://linkedin.com/in/tejas-srinivas07",
  github: "https://github.com/tejas-srinivas",
  bio: "Full Stack Engineer at ToyStack AI, Bangalore. I build scalable systems and clean interfaces — from GraphQL APIs and AWS pipelines to React dashboards and school management platforms. Currently focused on survey tooling with voice processing, multi-language workflows, and analytics.",
  roles: ["Full Stack Engineer", "Backend Dev", "React Developer"],
};

export const projects: Project[] = [
  {
    id: "survey-mgmt",
    name: "Core Survey Management System",
    description:
      "Full-stack survey platform with Admin (drag-drop builder, analytics) and Respondent (voice recording, OTP login, 10+ question types) modules.",
    tech: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Prisma ORM", "AWS"],
    metric: "70% reduction in localization time",
    github: "https://github.com/tejas-srinivas",
    featured: true,
  },
  {
    id: "school-mgmt",
    name: "School Management System",
    description:
      "Admin + Student apps with bulk transcript generation (Puppeteer + S3 + SQS), CSV bulk uploads, signed S3 URLs, and audit logging.",
    tech: ["React", "Tailwind", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Prisma ORM", "AWS"],
    metric: "90% reduction in manual effort",
    github: "https://github.com/tejas-srinivas",
    featured: false,
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "ToyStack AI Pvt Ltd",
    role: "Full Stack Engineer",
    period: "Dec 2024 – Present",
    bullets: [
      "Took ownership of two major products, delivering complete end-to-end solutions from planning to release.",
      "Designed insight-driven dashboards with graphical visualizations for survey performance, rankings, trends, and respondent activity.",
      "Implemented multi-language workflow using AWS Translate with human-review pipeline, reducing localization time by 70%.",
      "Automated audio processing workflows with S3 & Transcribe for 100% of voice responses.",
      "Built core features for School Management System — complex student records, transcript generation, grade processing, reducing manual effort by 90%.",
      "Improved backend scalability through optimized queries, cron jobs, logging, and background job workflows.",
    ],
  },
  {
    company: "ToyStack AI Pvt Ltd",
    role: "Full Stack Dev Intern",
    period: "Sep 2024 – Dec 2024",
    bullets: [
      "Built a full-stack task management application with boards, lists, and drag-and-drop tasks including real-time updates.",
      "Designed secure multi-tenant access with role-based permissions, JWT authentication, and protected routes.",
      "Developed polished, responsive UI with Tailwind and ShadCN UI; added file uploads, chatbot sidebar, analytics dashboard.",
      "Fully containerized the app for production-ready deployment.",
    ],
  },
];

export const skills: Skills = {
  languages: ["JavaScript", "TypeScript", "SQL"],
  frontend: ["React.js", "Next.js", "Framer Motion", "Tailwind CSS", "ShadCN UI", "Apollo Client", "Redux Toolkit"],
  backend: ["Node.js", "Express.js", "REST", "GraphQL", "PostgreSQL", "Prisma ORM"],
  cloud: ["AWS (SQS, S3, Lambda, Transcribe, Translate)", "Docker", "Kubernetes"],
};

export const education: Education[] = [
  {
    institution: "SJB Institute of Technology",
    degree: "B.E in Information Science and Engineering",
    period: "Dec 2020 – May 2024",
    grade: "CGPA: 8.36 / 80.64%",
  },
];

export const marqueeText =
  "REACT · NODE.JS · GRAPHQL · AWS · TYPESCRIPT · POSTGRESQL · DOCKER · KUBERNETES · PRISMA · NEXT.JS · ";
