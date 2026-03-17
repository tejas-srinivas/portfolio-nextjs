# Portfolio App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio for Tejas Srinivasulu using Next.js 14, Tailwind CSS, and Framer Motion with a GitHub dark terminal aesthetic, scroll-synced animations, parallax text, and a bento project grid.

**Architecture:** Single-page App Router site assembled in `app/page.tsx`. All content is static in `src/lib/data.ts`. Every component is a `"use client"` file using Framer Motion for animations — `useScroll` + `useTransform` for scroll-driven effects, `whileInView` for section reveals, and `useSpring` for the progress bar.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, next/font (JetBrains Mono + Inter)

---

## Chunk 1: Project Setup

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`

- [ ] **Step 1: Bootstrap Next.js with TypeScript and Tailwind**

```bash
cd "/Users/tejassrinivasulu/Desktop/Weekend Projects/portfolio-app"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Expected: Project files created. `package.json` shows `"next": "14.x.x"`.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `framer-motion` appears in `package.json` dependencies.

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev &
sleep 5 && curl -s http://localhost:3000 | head -5
kill %1
```

Expected: HTML returned from localhost:3000.

- [ ] **Step 4: Commit**

```bash
git init
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs tailwind.config.ts .gitignore .eslintrc.json
git commit -m "chore: scaffold Next.js 14 project with Tailwind and Framer Motion"
```

---

### Task 2: Configure Tailwind theme and global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (font setup only)

- [ ] **Step 1: Update `tailwind.config.ts` to add JetBrains Mono font family**

Replace the contents of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Replace `src/app/globals.css` with theme base**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #0d1117;
  --bg-surface: #161b22;
  --border: #30363d;
  --text-primary: #e6edf3;
  --text-muted: #8b949e;
  --accent-green: #3fb950;
  --accent-blue: #58a6ff;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0d1117;
  color: #e6edf3;
  font-family: var(--font-inter), sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: #3fb95033;
  color: #e6edf3;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0d1117; }
::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #3fb950; }
```

- [ ] **Step 3: Update `src/app/layout.tsx` to load fonts and set metadata**

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejas Srinivasulu — Full Stack Engineer",
  description:
    "Full Stack Engineer building scalable systems and clean interfaces. React, Node.js, GraphQL, AWS.",
  openGraph: {
    title: "Tejas Srinivasulu — Full Stack Engineer",
    description: "Full Stack Engineer at ToyStack AI, Bangalore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx tailwind.config.ts
git commit -m "chore: configure Tailwind theme, global CSS, and Google Fonts"
```

---

### Task 3: Create CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Write CLAUDE.md at project root**

```markdown
# CLAUDE.md — Portfolio App

## Stack
- Next.js 14 App Router (TypeScript)
- Tailwind CSS for layout and spacing
- Framer Motion for all animations
- Fonts: JetBrains Mono (headings, code, labels), Inter (body text)

## Theme Tokens
Always use these exact values — do not use Tailwind color names for theme colors:
- bg-primary: #0d1117
- bg-surface: #161b22
- border: #30363d
- text-primary: #e6edf3
- text-muted: #8b949e
- accent-green: #3fb950
- accent-blue: #58a6ff

Use inline `style` prop for theme colors. Do NOT use Tailwind arbitrary value syntax for theme colors.

## Component Conventions
- Every component in `src/components/` must have `"use client"` at the top (all use Framer Motion)
- Props interfaces named `{ComponentName}Props`, defined in the same file
- No barrel exports — import directly from the component file
- All page content lives in `src/lib/data.ts` — never hardcode strings in JSX
- Section components receive no props; they import directly from `data.ts`

## Animation Rules
1. Only animate `transform` (x, y, scale, rotate, scaleX) and `opacity` — never layout properties
2. All scroll-driven animations use `useScroll` + `useTransform` from Framer Motion
3. Use `useSpring` only for the scroll progress bar
4. Never mix CSS `transition` with Framer Motion `animate` on the same element
5. Section reveal pattern: `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-100px" }}`
6. Add `will-change: transform` only to elements with active scroll-driven transforms
7. Typewriter role cycling must not start until name animation completes (~1400ms); use `onAnimationComplete` or `setTimeout(startRoleCycling, 1500)`

## Parallax Pattern
- Hero parallax: use global `useScroll()` (no target ref)
- All other scroll-driven sections: `useRef` on the section + `useScroll({ target: ref, offset: ["start end", "end start"] })`
- Do NOT share a single global scrollY across sections

## Tailwind Usage
- Use Tailwind for: layout (grid, flex, spacing, sizing), responsive breakpoints, border-radius, font-size
- Use inline `style` prop for theme colors and Framer Motion style values

## Don'ts
- Do NOT add ShadCN UI (ShadCN appears as a skill badge in data.ts only)
- Do NOT use Framer Motion `layout` prop on bento grid cards
- Do NOT use `position: fixed` for anything except ScrollProgress and Nav
- Do NOT add state management libraries (local state only)
- Do NOT create additional pages or routes
- Do NOT add a CMS or data fetching layer
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with stack conventions and animation rules"
```

---

## Chunk 2: Data Layer

### Task 4: Create `src/lib/data.ts` with TypeScript types and full content

**Files:**
- Create: `src/lib/data.ts`

- [ ] **Step 1: Create `src/lib/data.ts`**

```typescript
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
  github: string;
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add data.ts with all portfolio content and TypeScript types"
```

---

## Chunk 3: Layout Shell — ScrollProgress + Nav + layout.tsx

### Task 5: Create `ScrollProgress.tsx`

**Files:**
- Create: `src/components/ScrollProgress.tsx`

- [ ] **Step 1: Create `src/components/ScrollProgress.tsx`**

```tsx
"use client";
import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left", willChange: "transform", background: "#3fb950" }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px]"
      aria-hidden="true"
      role="progressbar"
      aria-label="Page scroll progress"
    />
  );
}
```

Note: The `motion.div` uses `scaleX` which is a transform — no layout properties animated.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollProgress.tsx
git commit -m "feat: add ScrollProgress component with spring-smoothed scroll tracking"
```

---

### Task 6: Create `Nav.tsx`

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  // Fade in after hero scrolls out (~90vh). heroThreshold is set after mount
  // so we can read window.innerHeight (not available during SSR).
  const [heroThreshold, setHeroThreshold] = useState(900);
  useEffect(() => {
    setHeroThreshold(window.innerHeight * 0.9);
  }, []);
  const opacity = useTransform(scrollY, [heroThreshold - 80, heroThreshold], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40"
        aria-label="Site navigation"
        style={{
          opacity,
          willChange: "opacity",
          background: "rgba(13,17,23,0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #30363d",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <span className="font-mono text-sm" style={{ color: "#3fb950" }}>
            tejas.dev
          </span>

          {/* Desktop links */}
          <ul className="hidden gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-mono text-sm transition-colors duration-200"
                  style={{ color: "#8b949e" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#e6edf3")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#8b949e")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className="block h-[2px] w-6 transition-all duration-200"
              style={{
                background: "#e6edf3",
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span
              className="block h-[2px] w-6 transition-all duration-200"
              style={{
                background: "#e6edf3",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[2px] w-6 transition-all duration-200"
              style={{
                background: "#e6edf3",
                transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 md:hidden"
          style={{ background: "#0d1117" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-mono text-2xl"
              style={{ color: "#e6edf3" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav with scroll-triggered fade-in and mobile overlay"
```

---

### Task 7: Wire ScrollProgress and Nav into `layout.tsx`

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update `src/app/layout.tsx` to include ScrollProgress and Nav**

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejas Srinivasulu — Full Stack Engineer",
  description:
    "Full Stack Engineer building scalable systems and clean interfaces. React, Node.js, GraphQL, AWS.",
  openGraph: {
    title: "Tejas Srinivasulu — Full Stack Engineer",
    description: "Full Stack Engineer at ToyStack AI, Bangalore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        <ScrollProgress />
        <Nav />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create minimal `src/app/page.tsx` stub for now**

```tsx
export default function Home() {
  return (
    <main>
      <div style={{ minHeight: "200vh", paddingTop: "200px", color: "#e6edf3", textAlign: "center" }}>
        Scaffold — sections coming next
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. No TypeScript or compilation errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "feat: wire ScrollProgress and Nav into layout, add page stub"
```

---

## Chunk 4: Hero Section

### Task 8: Create `Hero.tsx`

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

// Character-by-character typewriter variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax layers: large faded background name text at different speeds
  const y1 = useTransform(scrollY, [0, 600], [0, -100]);
  const y2 = useTransform(scrollY, [0, 600], [0, -180]);

  // Role cycling state
  const [roleIndex, setRoleIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  // useRef holds the interval so the outer cleanup can always reach it,
  // even if the component unmounts after setTimeout fires.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!typingDone) return;
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setRoleIndex((i) => (i + 1) % personalInfo.roles.length);
      }, 3000);
    }, 1500);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [typingDone]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const nameChars = personalInfo.name.split("");

  return (
    <section
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-16"
      style={{
        background: "#0d1117",
        backgroundImage:
          "radial-gradient(circle, #30363d 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Parallax text layer 1 */}
      <motion.div
        style={{ y: y1, willChange: "transform" }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none hidden md:flex"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[12vw] font-black leading-none tracking-tighter whitespace-nowrap"
          style={{ color: "#e6edf3", opacity: 0.04 }}
        >
          {personalInfo.name.toUpperCase()}
        </span>
      </motion.div>

      {/* Parallax text layer 2 */}
      <motion.div
        style={{ y: y2, willChange: "transform" }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none hidden md:flex"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[9vw] font-black leading-none tracking-tighter whitespace-nowrap"
          style={{ color: "#e6edf3", opacity: 0.07 }}
        >
          {personalInfo.name.toUpperCase()}
        </span>
      </motion.div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-3xl">
        {/* Comment line */}
        <p className="font-mono text-sm mb-4" style={{ color: "#8b949e" }}>
          // hello world
        </p>

        {/* Typewriter name */}
        <motion.h1
          className="font-mono text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
          style={{ color: "#e6edf3" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setTypingDone(true)}
          aria-label={personalInfo.name}
        >
          {nameChars.map((char, i) => (
            <motion.span key={i} variants={charVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {/* Blinking cursor */}
          <motion.span
            className="inline-block ml-1"
            style={{ color: "#3fb950" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
            aria-hidden="true"
          >
            ▋
          </motion.span>
        </motion.h1>

        {/* Role cycling */}
        <div className="mt-3 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="font-mono text-lg md:text-xl"
              style={{ color: "#58a6ff" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {personalInfo.roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <p className="mt-4 font-mono text-sm" style={{ color: "#8b949e" }}>
          $ building scalable systems &amp; clean UIs
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={scrollToProjects}
            className="font-mono text-sm px-6 py-3 rounded transition-opacity duration-200 hover:opacity-80"
            style={{ background: "#238636", color: "#ffffff" }}
          >
            View Work ↓
          </button>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-6 py-3 rounded border transition-colors duration-200"
            style={{ borderColor: "#30363d", color: "#8b949e" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#3fb950";
              (e.currentTarget as HTMLElement).style.color = "#3fb950";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#30363d";
              (e.currentTarget as HTMLElement).style.color = "#8b949e";
            }}
          >
            GitHub →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="#30363d" strokeWidth="2" />
          <motion.rect
            x="9" y="6" width="2" height="8" rx="1"
            fill="#3fb950"
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div style={{ minHeight: "100vh", background: "#0d1117" }} />
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Visual check — start dev server and verify**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Name types out character by character
- Green blinking cursor after name
- Role text fades in/out cycling after ~1.5s pause
- Two faint parallax text layers visible on desktop on scroll
- Scroll mouse wheel: progress bar fills at top, parallax layers move
- Nav is invisible at top, fades in after scrolling past hero height
- Resize to 375px: parallax layers hidden, single-column layout
- On mobile: hamburger icon visible, tap opens full-screen overlay above nav bar, tap link closes overlay

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with typewriter, role cycling, and parallax layers"
```

---

## Chunk 5: ParallaxText Banner + About

### Task 9: Create `ParallaxText.tsx`

**Files:**
- Create: `src/components/ParallaxText.tsx`

- [ ] **Step 1: Create `src/components/ParallaxText.tsx`**

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxTextProps {
  text: string;
  direction: "left" | "right";
}

export default function ParallaxText({ text, direction }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 960px travel (≈60rem at 16px base) provides movement across all viewport widths
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-960, 960] : [960, -960]
  );

  // Repeat text 3× for seamless loop appearance
  const repeatedText = `${text}${text}${text}`;

  return (
    <div ref={ref} className="overflow-hidden py-3" aria-hidden="true">
      <motion.div
        style={{ x, willChange: "transform" }}
        className="flex whitespace-nowrap"
      >
        <span
          className="font-mono text-2xl font-bold tracking-widest md:text-4xl"
          style={{ color: "#3fb950", opacity: 0.3 }}
        >
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Create the `ParallaxBanner` section wrapper in `src/components/ParallaxBanner.tsx`**

Note: The spec's file list shows only `ParallaxText.tsx`. `ParallaxBanner.tsx` is intentionally added here as a thin wrapper that owns the section landmark (`<section>` tag, border styles) while `ParallaxText.tsx` stays a pure reusable component. This keeps responsibilities separated.

```tsx
"use client";
import ParallaxText from "@/components/ParallaxText";
import { marqueeText } from "@/lib/data";

export default function ParallaxBanner() {
  return (
    <section
      className="py-6 overflow-hidden"
      style={{ background: "#0d1117", borderTop: "1px solid #30363d", borderBottom: "1px solid #30363d" }}
    >
      <ParallaxText text={marqueeText} direction="left" />
      <ParallaxText text={marqueeText} direction="right" />
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ParallaxText.tsx src/components/ParallaxBanner.tsx
git commit -m "feat: add ParallaxText and ParallaxBanner with scroll-driven marquee"
```

---

### Task 10: Create `About.tsx`

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create `src/components/About.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { personalInfo, education } from "@/lib/data";

const SECTION_REVEAL = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-24 md:px-16"
    >
      {/* Section label */}
      <motion.p
        {...SECTION_REVEAL}
        className="font-mono text-xs tracking-widest mb-8"
        style={{ color: "#3fb950" }}
      >
        $ whoami
      </motion.p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left: bio + education */}
        <motion.div {...SECTION_REVEAL} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}>
          <p className="text-base leading-relaxed" style={{ color: "#8b949e" }}>
            {personalInfo.bio}
          </p>

          {/* Education card */}
          <div
            className="mt-8 rounded-md p-4"
            style={{ background: "#161b22", border: "1px solid #30363d" }}
          >
            <p className="font-mono text-xs tracking-widest mb-2" style={{ color: "#3fb950" }}>
              EDUCATION
            </p>
            {education.map((edu) => (
              <div key={edu.institution}>
                <p className="font-mono text-sm font-semibold" style={{ color: "#e6edf3" }}>
                  {edu.institution}
                </p>
                <p className="text-sm mt-1" style={{ color: "#8b949e" }}>
                  {edu.degree}
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: "#8b949e" }}>
                  {edu.period} · {edu.grade}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: terminal whoami block */}
        <motion.div
          {...SECTION_REVEAL}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <div
            className="rounded-md p-6 font-mono text-sm"
            style={{ background: "#161b22", border: "1px solid #30363d" }}
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid #30363d" }}>
              <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-2 text-xs" style={{ color: "#8b949e" }}>~/profile</span>
            </div>

            <p className="mb-3" style={{ color: "#3fb950" }}>$ whoami</p>
            {[
              ["name", personalInfo.name],
              ["role", personalInfo.role],
              ["location", personalInfo.location],
              ["email", personalInfo.email],
              ["github", "github.com/tejas-srinivas"],
              ["status", "open to opportunities"],
            ].map(([key, value]) => (
              <div key={key} className="flex gap-2 mb-1">
                <span style={{ color: "#58a6ff" }}>&gt; {key}:</span>
                <span
                  style={{
                    color: key === "status" ? "#3fb950" : "#e6edf3",
                    paddingLeft: `${Math.max(0, 10 - key.length) * 0.5}rem`,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: add About section with bio and terminal whoami block"
```

---

## Chunk 6: Projects, Experience, Skills, Contact

### Task 11: Create `Projects.tsx` (bento grid)

**Files:**
- Create: `src/components/Projects.tsx`

- [ ] **Step 1: Create `src/components/Projects.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { projects, Project } from "@/lib/data";

// Map tech names to badge colors
const getTechColor = (tech: string): string => {
  const t = tech.toLowerCase();
  if (["react.js", "react", "next.js", "tailwind", "framer motion", "apollo client", "redux toolkit", "shadcn ui"].some(f => t.includes(f.split(" ")[0])))
    return "#3fb950"; // green — frontend
  if (["aws", "s3", "sqs", "lambda", "transcribe", "translate", "docker", "kubernetes"].some(f => t.includes(f)))
    return "#f78166"; // orange-red — cloud/infra
  return "#58a6ff"; // blue — backend/default
};

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 }}
      className={`rounded-lg p-6 flex flex-col ${featured ? "row-span-2" : ""}`}
      style={{ background: "#161b22", border: "1px solid #30363d" }}
    >
      {/* Header */}
      <div>
        <p className="font-mono text-xs tracking-widest mb-2" style={{ color: "#8b949e" }}>
          $ project --name
        </p>
        <h3 className="font-mono text-base font-bold leading-snug" style={{ color: "#e6edf3" }}>
          {project.name}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "#8b949e" }}>
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-1 rounded"
            style={{ background: "#21262d", color: getTechColor(tech) }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Metric */}
      <p className="mt-4 font-mono text-xs" style={{ color: "#3fb950" }}>
        ↓ {project.metric}
      </p>

      {/* GitHub link */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs transition-colors duration-200"
        style={{ color: "#8b949e" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#3fb950")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8b949e")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
        </svg>
        View on GitHub
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-6 py-24 md:px-16"
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-xs tracking-widest mb-8"
        style={{ color: "#3fb950" }}
      >
        $ ls projects/
      </motion.p>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
        {/* Featured (tall left tile) */}
        {featured && (
          <ProjectCard project={featured} index={0} featured />
        )}

        {/* Rest of projects */}
        {rest.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i + 1} />
        ))}

        {/* Placeholder tile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: (rest.length + 1) * 0.12 }}
          className="rounded-lg p-6 flex items-center justify-center"
          style={{
            background: "transparent",
            border: "1px dashed #30363d",
          }}
        >
          <p className="font-mono text-sm" style={{ color: "#30363d" }}>
            + more coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: add Projects bento grid with staggered card animations"
```

---

### Task 12: Create `Experience.tsx`

**Files:**
- Create: `src/components/Experience.tsx`

- [ ] **Step 1: Create `src/components/Experience.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-6 py-24 md:px-16"
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-xs tracking-widest mb-12"
        style={{ color: "#3fb950" }}
      >
        $ git log --oneline --experience
      </motion.p>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: "#30363d" }}
        />

        {experience.map((entry, index) => (
          <motion.div
            key={`${entry.company}-${entry.role}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            className="relative mb-12 last:mb-0"
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[37px] top-1 h-3 w-3 rounded-full border-2"
              style={{ background: "#0d1117", borderColor: "#3fb950" }}
            />

            {/* Entry header */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <div>
                <h3 className="font-mono text-base font-bold" style={{ color: "#e6edf3" }}>
                  {entry.role}
                </h3>
                <p className="font-mono text-sm" style={{ color: "#58a6ff" }}>
                  {entry.company}
                </p>
              </div>
              <span className="font-mono text-xs" style={{ color: "#8b949e" }}>
                {entry.period}
              </span>
            </div>

            {/* Bullet points */}
            <ul className="space-y-2">
              {entry.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: "#8b949e" }}>
                  <span className="mt-1 flex-shrink-0 font-mono text-xs" style={{ color: "#3fb950" }}>
                    →
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: add Experience vertical timeline with scroll animations"
```

---

### Task 13: Create `Skills.tsx`

**Files:**
- Create: `src/components/Skills.tsx`

- [ ] **Step 1: Create `src/components/Skills.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const SKILL_GROUPS: Array<{ label: string; key: keyof typeof skills; color: string }> = [
  { label: "LANGUAGES", key: "languages", color: "#f78166" },
  { label: "FRONTEND", key: "frontend", color: "#3fb950" },
  { label: "BACKEND", key: "backend", color: "#58a6ff" },
  { label: "CLOUD / DEVOPS", key: "cloud", color: "#ffa657" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl px-6 py-24 md:px-16"
      style={{ borderTop: "1px solid #30363d" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-xs tracking-widest mb-12"
        style={{ color: "#3fb950" }}
      >
        $ cat skills.json
      </motion.p>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: groupIndex * 0.1 }}
          >
            <p
              className="font-mono text-xs tracking-widest mb-4"
              style={{ color: group.color }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills[group.key].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: groupIndex * 0.1 + i * 0.04 }}
                  className="font-mono text-xs px-3 py-1 rounded-full cursor-default transition-colors duration-200"
                  style={{ background: "#161b22", color: "#e6edf3", border: "1px solid #30363d" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = group.color;
                    (e.currentTarget as HTMLElement).style.color = group.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#30363d";
                    (e.currentTarget as HTMLElement).style.color = "#e6edf3";
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "feat: add Skills section with grouped pill badges and stagger animation"
```

---

### Task 14: Create `Contact.tsx`

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Create `src/components/Contact.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const CONTACTS = [
  {
    label: "email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/tejas-srinivas07",
    href: personalInfo.linkedin,
  },
  {
    label: "github",
    value: "github.com/tejas-srinivas",
    href: personalInfo.github,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-6 py-24 text-center md:px-16"
      style={{ borderTop: "1px solid #30363d" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-xs tracking-widest mb-4"
        style={{ color: "#3fb950" }}
      >
        $ contact --tejas
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="font-mono text-2xl font-bold mb-12 md:text-3xl"
        style={{ color: "#e6edf3" }}
      >
        Get In Touch
      </motion.h2>

      <div className="flex flex-col items-center gap-4">
        {CONTACTS.map((contact, i) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target={contact.label !== "email" ? "_blank" : undefined}
            rel={contact.label !== "email" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + i * 0.1 }}
            className="group flex items-center gap-3 font-mono text-sm transition-colors duration-200"
            style={{ color: "#8b949e" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#3fb950")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8b949e")}
          >
            <span style={{ color: "#3fb950" }}>→</span>
            <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-current transition-all duration-200">
              {contact.value}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-20 font-mono text-xs"
        style={{ color: "#30363d" }}
      >
        © 2026 Tejas Srinivasulu · Built with Next.js + Framer Motion
      </motion.p>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: add Contact section with mailto and social links"
```

---

## Chunk 7: Final Assembly + Polish

### Task 15: Assemble `page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx` with full page assembly**

Note: `page.tsx` intentionally does NOT have `"use client"` — it is a Server Component that simply imports and renders client components. All client-side Framer Motion behavior lives inside the individual component files.

```tsx
import Hero from "@/components/Hero";
import ParallaxBanner from "@/components/ParallaxBanner";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ background: "#0d1117" }}>
      <Hero />
      <ParallaxBanner />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Verify production build succeeds**

```bash
npm run build
```

Expected: Build succeeds. All pages and components compiled with no TypeScript errors.

- [ ] **Step 3: Start dev server and do a full visual walkthrough**

```bash
npm run dev
```

Open http://localhost:3000 and verify each section:

| Section | What to check |
|---------|---------------|
| Hero | Typewriter name, role cycling, parallax layers visible on scroll, scroll indicator |
| Progress bar | Green bar fills as you scroll down the page |
| Nav | Hidden on hero, fades in once scrolled past hero, mobile hamburger works |
| Parallax Banner | Two rows moving in opposite directions on scroll |
| About | Two-column on desktop, terminal whoami block renders correctly |
| Projects | Bento grid layout, cards animate in staggered, badges colored correctly |
| Experience | Timeline line visible, entries animate in from left |
| Skills | Grouped pills, hover color changes |
| Contact | Links work (mailto: opens mail, GitHub/LinkedIn open in new tab) |

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble full single-page portfolio with all sections"
```

---

### Task 16: Responsive polish

**Files:**
- Review all component files for mobile breakpoint correctness

- [ ] **Step 1: Test on mobile viewport in browser**

Open DevTools → Toggle device toolbar → iPhone SE (375px) and iPhone 14 (390px).

Verify:
- Hero: single column, no horizontal overflow, parallax layers hidden (`hidden md:flex`)
- Parallax Banner: single row still scrolls, no overflow
- About: stacks to single column
- Projects: single column cards, no grid overflow
- Experience: timeline visible, text readable
- Skills: pills wrap naturally
- Nav: hamburger shows, overlay opens/closes

- [ ] **Step 2: Fix any overflow issues found**

Common fixes if needed:
- Add `overflow-x: hidden` to `<body>` in `globals.css` if parallax causes horizontal scroll
- Add `max-w-full` to text elements that overflow on small screens

```css
/* Add to globals.css if horizontal scroll appears */
body {
  overflow-x: hidden;
}
```

- [ ] **Step 3: Final production build and type check**

```bash
npx tsc --noEmit && npm run build
```

Expected: Zero TypeScript errors. Build succeeds with no warnings about missing types.

- [ ] **Step 4: Add `.superpowers/` to `.gitignore` before final staging**

The visual companion server creates `.superpowers/` at the project root. Add it to `.gitignore` before the final `git add` so it is never staged.

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 5: Final commit with explicit file paths (not `git add -A`)**

Use explicit paths to avoid accidentally staging `.superpowers/` or other unintended files.

```bash
git add src/app/globals.css src/components/ .gitignore
git commit -m "polish: fix mobile responsive layout, add overflow guard to body"
```
