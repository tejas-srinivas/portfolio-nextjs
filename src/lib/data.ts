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
  siteHandle: string;
  status: string;
  tagline: string;
  terminalComment: string;
  githubHandle: string;
  linkedinHandle: string;
  contactTitle: string;
  contactMessage: string;
  availabilityLabel: string;
  availabilityKeyLabel: string;
  emailCtaLabel: string;
  heroLead: string;
  heroProofs: string[];
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  heroGithubCtaLabel: string;
}

export interface Project {
  id: string;
  name: string;
  scope: string;
  description: string;
  highlights: string[];
  tech: string[];
  metric: string;
  github?: string;
  featured: boolean;
}

export interface ProjectSectionContent {
  terminalLabel: string;
  heading: string;
  description: string;
  scopeLabel: string;
  impactLabel: string;
  highlightsLabel: string;
  stackLabel: string;
  featuredBadgeLabel: string;
  githubLabel: string;
  secondaryCtaLabel: string;
  moreComingLabel: string;
}

export interface MarqueeRow {
  text: string;
  direction: "left" | "right";
  duration: number;
  color: string;
  opacity: number;
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
  siteHandle: "tejas.dev",
  status: "open to opportunities",
  tagline: "$ building scalable systems & clean UIs",
  terminalComment: "// hello world",
  githubHandle: "github.com/tejas-srinivas",
  linkedinHandle: "linkedin.com/in/tejas-srinivas07",
  contactTitle: "Let us build something meaningful",
  contactMessage:
    "I enjoy building products end to end, from architecture and APIs to clean frontend experiences. If you are hiring or collaborating, I would love to connect.",
  availabilityLabel: "Open to opportunities",
  availabilityKeyLabel: "STATUS",
  emailCtaLabel: "Email Me",
  heroLead: "Full Stack Engineer at ToyStack AI",
  heroProofs: [
    "Built and shipped multi-language survey workflows",
    "Designed scalable backend pipelines for voice responses",
    "Owned products from architecture to production release",
  ],
  heroPrimaryCtaLabel: "View Work ↓",
  heroSecondaryCtaLabel: "Contact Me",
  heroGithubCtaLabel: "GitHub →",
};

export const projects: Project[] = [
  {
    id: "task-management-app",
    name: "Task Management Application",
    scope: "Full-Stack Multi-Client Kanban Platform",
    description:
      "A modern full-stack task management system with kanban boards, multi-client isolation, and role-based access control across admin and member workflows.",
    highlights: [
      "Built board/list/task management flows with drag-and-drop interactions, comments, checklists, assignments, and advanced filtering.",
      "Implemented multi-client architecture with three-tier RBAC (Super Admin, Client Admin, Member) and protected routes.",
      "Delivered end-to-end GraphQL stack with React + Apollo frontend and Node.js + Express + Prisma + PostgreSQL backend.",
    ],
    tech: ["React 19", "TypeScript", "Node.js", "Express", "GraphQL", "Apollo Client", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "Vite"],
    metric: "Open-source full-stack app with Kanban, RBAC, and multi-client workflows",
    github: "https://github.com/tejas-srinivas/task-management-app",
    featured: true,
  },
  {
    id: "survey-mgmt",
    name: "Survey Management System",
    scope: "Admin + Respondent Platform",
    description:
      "Full-stack survey platform with Admin (drag-drop builder, analytics) and Respondent (voice recording, OTP login, 10+ question types) modules.",
    highlights: [
      "Designed dynamic survey schema to support 10+ question types across multilingual workflows.",
      "Integrated voice-response ingestion with automated S3 and Transcribe processing pipeline.",
      "Built role-specific dashboards for completion, ranking trends, and operational insights.",
    ],
    tech: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Prisma ORM", "AWS"],
    metric: "Faster multilingual survey localization workflows",
    featured: false,
  },
  {
    id: "school-mgmt",
    name: "School Management System",
    scope: "Admin + Student Portfolio Platform",
    description:
      "Admin Dashboard + Student Portfolio Website with bulk transcript generation (Puppeteer + S3 + SQS), CSV bulk uploads, signed S3 URLs, and audit logging.",
    highlights: [
      "Automated transcript generation and storage with queue-driven background workers.",
      "Implemented signed URL and audit pipelines for secure, traceable student record access.",
      "Delivered bulk import and validation workflows to reduce repetitive manual operations.",
    ],
    tech: ["React", "Tailwind", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Prisma ORM", "AWS"],
    metric: "Automated transcript and records workflows for school operations",
    featured: false,
  },
  {
    id: "job-recruitment-platform",
    name: "Job Recruitment Platform",
    scope: "Internal Hiring Workflow Platform",
    description:
      "An internal recruitment platform for managing hiring pipelines, candidate tracking, and recruiter coordination workflows from screening to final decisions.",
    highlights: [
      "Built recruiter-facing workflow screens for role creation, candidate stages, and interview pipeline visibility.",
      "Implemented candidate management flows with structured profile review, status updates, and hiring progression tracking.",
      "Designed modular UI patterns to support internal collaboration between recruiters, interviewers, and hiring stakeholders.",
    ],
    tech: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Tailwind CSS"],
    metric: "Internal platform for streamlined recruitment operations",
    featured: false,
  },
];

export const projectSectionContent: ProjectSectionContent = {
  terminalLabel: "$ ls projects/",
  heading: "Selected Product Work",
  description:
    "Detailed case-study cards focused on business impact, architecture decisions, and delivery outcomes.",
  scopeLabel: "SCOPE",
  impactLabel: "IMPACT",
  highlightsLabel: "ENGINEERING HIGHLIGHTS",
  stackLabel: "STACK",
  featuredBadgeLabel: "FEATURED",
  githubLabel: "View GitHub ↗",
  secondaryCtaLabel: "Discuss this build",
  moreComingLabel: "+ more case studies coming soon",
};

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
  languages: ["JavaScript", "TypeScript", "SQL", "Python", "HTML", "CSS"],
  frontend: ["React.js", "Next.js", "Framer Motion", "Tailwind CSS", "ShadCN UI", "Apollo Client", "Redux Toolkit", "Vite", "Webpack"],
  backend: ["Node.js", "Express.js", "REST", "GraphQL", "PostgreSQL", "Prisma ORM", "MongoDB", "Redis", "Socket.io", "JWT", "Puppeteer"],
  cloud: ["AWS (S3, SQS, Lambda, Transcribe, Translate, EC2, RDS)", "Docker", "Kubernetes", "GitHub Actions", "Nginx", "PM2"],
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

export const marqueeRows: MarqueeRow[] = [
  {
    text: "REACT · NEXT.JS · TYPESCRIPT · FRAMER MOTION · TAILWIND · GRAPHQL · ",
    direction: "left",
    duration: 30,
    color: "#3fb950",
    opacity: 0.3,
  },
  {
    text: "SCALABLE BACKENDS · AWS PIPELINES · VOICE WORKFLOWS · PRODUCT DELIVERY · ",
    direction: "right",
    duration: 24,
    color: "#58a6ff",
    opacity: 0.24,
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
