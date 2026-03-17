# Portfolio App — Design Spec
**Date:** 2026-03-17
**Owner:** Tejas Srinivasulu

---

## Overview

A single-page personal portfolio built with Next.js 14, Tailwind CSS, and Framer Motion. GitHub dark terminal aesthetic with scroll-synced animations, parallax text effects, and a bento project grid.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Language | TypeScript |
| Font | JetBrains Mono (headings/code), Inter (body) |

---

## Visual Theme

- **Background:** `#0d1117` (GitHub dark)
- **Primary text:** `#e6edf3`
- **Accent green:** `#3fb950`
- **Accent blue:** `#58a6ff`
- **Muted text:** `#8b949e`
- **Surface:** `#161b22`
- **Border:** `#30363d`

Aesthetic: terminal / code-editor. Monospace type for names, roles, labels. Green cursor blink. Badge pills styled as CLI output.

---

## Page Structure

Single-page, full-scroll. Sections assembled in `app/page.tsx`. No routing except the root.

### Section Order

1. **Hero** — full viewport
2. **Parallax Text Banner** — horizontal infinite marquee
3. **About** — two-column bio + terminal whoami block
4. **Projects** — bento grid
5. **Experience** — vertical timeline
6. **Skills** — grouped tag pills
7. **Contact** — centered links

**Fixed elements:**
- Scroll progress bar (`position: fixed`, top-0, z-50)
- Nav (`position: fixed`, top-0, z-40, fades in on scroll)

---

## File Structure

```
src/
  app/
    layout.tsx          # global font, ScrollProgress, Nav
    page.tsx            # assembles all sections
  components/
    Hero.tsx
    About.tsx
    Projects.tsx
    Experience.tsx
    Skills.tsx
    Contact.tsx
    ScrollProgress.tsx
    ParallaxText.tsx
    Nav.tsx
  lib/
    data.ts             # all content — name, roles, projects, experience, skills, bio
  styles/
    globals.css
CLAUDE.md
```

---

## Content (from resume)

### Personal
- **Name:** Tejas Srinivasulu
- **Role:** Full Stack Engineer
- **Location:** Bangalore, Karnataka
- **Email:** stejas2002@gmail.com
- **LinkedIn:** linkedin.com/in/tejas-srinivas07
- **GitHub:** github.com/tejas-srinivas

### Bio (for About section and `data.ts`)
> "Full Stack Engineer at ToyStack AI, Bangalore. I build scalable systems and clean interfaces — from GraphQL APIs and AWS pipelines to React dashboards and school management platforms. Currently focused on survey tooling with voice processing, multi-language workflows, and analytics."

### Education
- SJB Institute of Technology — B.E Information Science & Engineering (Dec 2020 – May 2024, CGPA 8.36)

### Experience

**ToyStack AI — Full Stack Engineer** (Dec 2024 – Present)
- Took ownership of two major products, delivering complete end-to-end solutions from planning to release
- Designed insight-driven dashboards with graphical visualizations for survey performance, rankings, trends, and respondent activity
- Implemented multi-language workflow using AWS Translate with human-review pipeline, reducing localization time by 70%
- Automated audio processing workflows with S3 & Transcribe for 100% of voice responses
- Built core features for School Management System — complex student records, transcript generation, grade processing, reducing manual effort by 90%
- Improved backend scalability through optimized queries, cron jobs, logging, and background job workflows

**ToyStack AI — Full Stack Dev Intern** (Sep 2024 – Dec 2024)
- Built a full-stack task management application with boards, lists, and drag-and-drop tasks including real-time updates
- Designed secure multi-tenant access with role-based permissions, JWT authentication, and protected routes
- Developed polished, responsive UI with Tailwind and ShadCN UI; added file uploads, chatbot sidebar, analytics dashboard
- Fully containerized the app for production-ready deployment

### Projects

**Core Survey Management System**
- Tech: React, TypeScript, Node.js, GraphQL, PostgreSQL, Prisma ORM, AWS
- Description: Full-stack survey platform with Admin (drag-drop builder, analytics) and Respondent (voice recording, OTP login, 10+ question types) modules
- Key metric: 70% reduction in localization time via AWS Transcribe/Translate pipeline

**School Management System**
- Tech: React, Tailwind, TypeScript, Node.js, GraphQL, PostgreSQL, Prisma ORM, AWS
- Description: Admin + Student apps with bulk transcript generation (Puppeteer + S3 + SQS), CSV bulk uploads, signed S3 URLs, audit logging
- Key metric: 90% reduction in manual effort for transcript generation

### Skills (for `data.ts`)
- **Languages:** JavaScript, TypeScript, SQL
- **Frontend:** React.js, Next.js, Framer Motion, Tailwind CSS, ShadCN UI, Apollo Client, Redux Toolkit
- **Backend:** Node.js, Express.js, REST, GraphQL, PostgreSQL, Prisma ORM
- **Cloud/DevOps:** AWS (SQS, S3, Lambda, Transcribe, Translate), Docker, Kubernetes

---

## Section Designs

### Hero
- Full viewport height (`min-h-screen`)
- Background: `#0d1117` with CSS background-image dot grid (`radial-gradient` pattern, 1px dots, very subtle)
- Typewriter animation: name (`Tejas Srinivasulu`) types letter-by-letter at ~60ms per character; blinking green cursor `▋` appended
- After name finishes typing (~1400ms), role cycling begins with 3000ms interval: `Full Stack Engineer` → `Backend Dev` → `React Developer` (current fades out over 300ms, next fades in over 300ms)
- Two parallax text layers behind (large faded monospace name): Layer 1 `useTransform(scrollY, [0, 600], [0, -100])`, Layer 2 `useTransform(scrollY, [0, 600], [0, -180])`
- CTAs: `View Work ↓` (smooth scroll to `#projects`) + GitHub icon link
- Mobile: single column, parallax layers hidden on `sm:` and below

### Parallax Text Banner
- Full-width, overflow hidden
- Two rows of: `REACT · NODE.JS · GRAPHQL · AWS · TYPESCRIPT · POSTGRESQL · DOCKER ·` (content repeated 3× for seamless loop)
- Row 1: `useTransform(scrollYProgress, [0, 1], [-960, 960])` — x in pixels (960px = 60rem at 16px base), moves right on scroll
- Row 2: `useTransform(scrollYProgress, [0, 1], [960, -960])` — x in pixels, moves left on scroll
- Uses `useRef` on the section + `useScroll({ target: ref, offset: ["start end", "end start"] })`
- Font: JetBrains Mono, large (`text-2xl md:text-4xl`), color: `#3fb950` at 30% opacity
- Mobile: single row, reduced font size, parallax still active

### About
- Two-column layout on desktop (`grid-cols-2`), single column on mobile
- Left: bio paragraph + education card
- Right: terminal-style block:
  ```
  $ whoami
  > name:     Tejas Srinivasulu
  > role:     Full Stack Engineer
  > location: Bangalore, Karnataka
  > email:    stejas2002@gmail.com
  > github:   github.com/tejas-srinivas
  > status:   open to opportunities
  ```
- Entire section animates in `whileInView`

### Projects (Bento Grid)
Desktop layout (`grid-cols-2 grid-rows-2`):
- Survey Mgmt: `col-span-1 row-span-2` (tall left tile)
- School Mgmt: `col-span-1 row-span-1` (top right)
- "More coming soon": `col-span-1 row-span-1` (bottom right, muted, dashed border)

Mobile: single column, all cards full width.

Each card contains:
- Project name (JetBrains Mono, white)
- Tech badges: pill tags in `#21262d` bg, colored text (green for frontend, blue for backend, orange for AWS)
- 1-line description
- Key metric in green
- GitHub link (icon + text)

Cards stagger-animate: `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `transition={{ delay: index * 0.12 }}`, `viewport={{ once: true, margin: "-80px" }}`

### Experience
- Vertical timeline with a left connecting line (`border-l-2 border-[#30363d]`)
- Each entry: dot on the line, date range (right-aligned), company + role, bullet points
- Entries animate in from left: `initial={{ opacity: 0, x: -30 }}`, `whileInView={{ opacity: 1, x: 0 }}`, `viewport={{ once: true }}`
- Mobile: same layout, smaller font

### Skills
- Four groups: Languages / Frontend / Backend / Cloud/DevOps
- Group label: small uppercase monospace in green
- Pills: `bg-[#21262d] text-[#e6edf3]`, hover: `border border-[#3fb950]`
- Stagger: `transition={{ delay: index * 0.04 }}`
- Mobile: wraps naturally

### Contact
- Centered layout
- Prompt line: `$ contact --tejas`
- Email: `mailto:stejas2002@gmail.com` link (opens mail client), LinkedIn and GitHub as external `href` links
- All three displayed as monospace text with `→` prefix
- Subtle hover: underline in green

### Nav
- `position: fixed`, top-0, full width, z-40
- Initial: `opacity: 0` (hidden during hero)
- Trigger: `useScroll` → when `scrollY > heroHeight (window.innerHeight * 0.9)`, `opacity` animates to 1 via `useTransform`
- Contents: left — `tejas.dev` (monospace), right — anchor links: `About · Projects · Experience · Contact`
- Background: `bg-[#0d1117]/80 backdrop-blur-sm`, bottom border `border-[#30363d]`
- Mobile: hamburger menu → full-screen overlay nav

---

## Animation System

### Scroll Progress Bar (`ScrollProgress.tsx`)
```
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

<motion.div
  style={{ scaleX, transformOrigin: "left" }}
  className="fixed top-0 left-0 right-0 h-[2px] bg-[#3fb950] z-50"
/>
```

### Hero Parallax Layers
```
const { scrollY } = useScroll()
const y1 = useTransform(scrollY, [0, 600], [0, -100])
const y2 = useTransform(scrollY, [0, 600], [0, -180])

// Two motion.div layers, absolute positioned, large faded monospace text
// opacity: 0.04 and 0.07 respectively
```

### Parallax Marquee (`ParallaxText.tsx`)
```tsx
// Props: children (string), direction ("left" | "right"), baseVelocity (number)
const ref = useRef(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
// x is a MotionValue<number> in pixels, applied directly to Framer Motion x prop
// 960px = 60rem at 16px base — provides enough travel across viewport widths
const x = useTransform(scrollYProgress, [0, 1], direction === "left" ? [-960, 960] : [960, -960])

// Row content duplicated 3× inside overflow-hidden container
```

### Section Reveals (standard pattern)
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>
```

### Bento Card Stagger
```tsx
{projects.map((project, index) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 }}
  />
))}
```

### Typewriter
```tsx
// Render characters as array of motion.span
// Each character: initial opacity 0, animate to opacity 1
// variants with staggerChildren: 0.06
// Role cycling starts after name animation completes (~1400ms total)
// Interval: 3000ms per role, fade transition: 300ms
```

### Rules
- Only `transform` and `opacity` animated (GPU-accelerated, no layout reflow)
- `useScroll` + `useTransform` for all scroll-driven values
- `useSpring` for smoothing scroll progress bar only
- No CSS transitions mixed with Framer Motion on the same element
- `will-change: transform` added only to elements with active scroll-driven transforms

---

## Responsive Behavior

| Breakpoint | Changes |
|---|---|
| Mobile (`< 768px`) | Single column layout throughout; parallax layers hidden in hero; nav collapses to hamburger; bento grid → single column |
| Tablet (`768px–1024px`) | Two-column bento; nav full; parallax active |
| Desktop (`> 1024px`) | Full layout as designed |

Framer Motion parallax remains active on mobile (no performance issues with `useTransform` on scroll — only `useScroll` with `layoutEffect` can cause issues on iOS, which is avoided by using the default `useScroll` behavior).

---

## `data.ts` Shape

```typescript
export const personalInfo = {
  name: "Tejas Srinivasulu",
  role: "Full Stack Engineer",
  location: "Bangalore, Karnataka",
  email: "stejas2002@gmail.com",
  linkedin: "https://linkedin.com/in/tejas-srinivas07",
  github: "https://github.com/tejas-srinivas",
  bio: "...",
  roles: ["Full Stack Engineer", "Backend Dev", "React Developer"]  // used by typewriter role cycling
}
export const projects = [{ id, name, description, tech[], metric, github, featured }]
export const experience = [{ company, role, period, bullets[] }]
export const skills = { languages[], frontend[], backend[], cloud[] }
export const education = [{ institution, degree, period, grade }]
```

---

## CLAUDE.md (full content)

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

## Component Conventions
- Every component in `src/components/` must have `"use client"` at the top (all use Framer Motion)
- Props interfaces are named `{ComponentName}Props` and defined in the same file
- No barrel exports — import directly from the component file
- All page content lives in `src/lib/data.ts` — never hardcode strings in JSX
- Section components receive no props; they import directly from `data.ts`

## Animation Rules
1. Only animate `transform` (x, y, scale, rotate, scaleX) and `opacity` — never animate layout properties (width, height, padding, margin)
2. All scroll-driven animations use `useScroll` + `useTransform` from Framer Motion
3. Use `useSpring` only for the scroll progress bar
4. Never mix CSS `transition` with Framer Motion `animate` on the same element
5. Section reveal pattern: `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-100px" }}`
6. Add `will-change: transform` only to elements with active scroll-driven transforms
7. Typewriter role cycling must not start until name animation completes (~1400ms); use `onAnimationComplete` callback or a `setTimeout(startRoleCycling, 1500)` guard

## Parallax Pattern
- Hero parallax: use global `useScroll()` (no target ref) — it's the first section
- All other scroll-driven sections: use `useRef` on the section element and `useScroll({ target: ref, offset: ["start end", "end start"] })`
- Do NOT share a single global scrollY across all sections — scope to the section

## Tailwind Usage
- Use Tailwind for: layout (grid, flex, spacing, sizing), responsive breakpoints, border-radius, font-size
- Use inline `style` prop for: theme colors (e.g. `style={{ color: '#3fb950' }}`), Framer Motion style values
- Do not use Tailwind arbitrary value syntax for theme colors (e.g. no `text-[#3fb950]`) — use inline styles for consistency

## Don'ts
- Do NOT add ShadCN UI — this is a static portfolio, not a component-heavy app (ShadCN appears as a skill badge only in data.ts)
- Do NOT use Framer Motion `layout` prop on bento grid cards — causes jank during scroll
- Do NOT use `position: fixed` for anything except ScrollProgress and Nav
- Do NOT add React Query, Zustand, or any state management library — local state only
- Do NOT create additional pages or routes — single-page only
- Do NOT add a CMS or data fetching layer — all content is static in data.ts
```

---

## Out of Scope

- Blog / writing section
- Dark/light mode toggle
- CMS integration
- Contact form with backend (links only)
- Project detail pages
