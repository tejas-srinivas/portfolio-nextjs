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
