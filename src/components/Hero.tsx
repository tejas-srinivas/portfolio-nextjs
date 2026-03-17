"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Parallax layer: oversized background name, shifts up on scroll
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);

  const nameChars = personalInfo.name.split("");

  // State-driven typewriter: reveals one character at a time
  const [displayedCount, setDisplayedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  // Role cycling state
  const [roleIndex, setRoleIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const proofIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [proofIndex, setProofIndex] = useState(0);
  const [proofDisplayedCount, setProofDisplayedCount] = useState(0);
  const currentProof = personalInfo.heroProofs[proofIndex] ?? "";

  // Typewriter: advance one character every 60ms
  useEffect(() => {
    if (displayedCount < nameChars.length) {
      const timer = setTimeout(() => setDisplayedCount((c) => c + 1), 60);
      return () => clearTimeout(timer);
    } else {
      setTypingDone(true);
    }
  }, [displayedCount, nameChars.length]);

  // Role cycling: starts 1500ms after name finishes typing
  useEffect(() => {
    if (!typingDone) return;
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setRoleIndex((i) => (i + 1) % personalInfo.roles.length);
      }, 3600);
    }, 1500);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [typingDone]);

  useEffect(() => {
    if (!typingDone) return;
    const timeout = setTimeout(() => {
      proofIntervalRef.current = setInterval(() => {
        setProofIndex((i) => (i + 1) % personalInfo.heroProofs.length);
      }, 4200);
    }, 2200);
    return () => {
      clearTimeout(timeout);
      if (proofIntervalRef.current) clearInterval(proofIntervalRef.current);
    };
  }, [typingDone]);

  useEffect(() => {
    if (!typingDone) return;
    if (prefersReducedMotion) {
      setProofDisplayedCount(currentProof.length);
      return;
    }
    setProofDisplayedCount(0);
  }, [proofIndex, typingDone, prefersReducedMotion, currentProof.length]);

  useEffect(() => {
    if (!typingDone || prefersReducedMotion) return;
    if (proofDisplayedCount >= currentProof.length) return;
    const timer = setTimeout(() => setProofDisplayedCount((c) => c + 1), 26);
    return () => clearTimeout(timer);
  }, [typingDone, prefersReducedMotion, proofDisplayedCount, currentProof.length]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const contactHref = `mailto:${personalInfo.email}`;

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
      {/* Parallax text — hidden on mobile. Oversized so it bleeds off both
          edges, acting as subtle texture rather than readable text. Shifted
          below center so it doesn't sit directly behind the heading. */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y1, willChange: "transform" }}
        className="pointer-events-none absolute left-0 right-0 top-[58%] hidden -translate-y-1/2 items-center justify-center select-none md:flex"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[10vw] font-black leading-none tracking-widest whitespace-nowrap"
          style={{ color: "#3fb950", opacity: 0.04 }}
        >
          {"{ } < /> [ ] $ ~ | ; _"}
        </span>
      </motion.div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-5xl">
        {/* Comment line */}
        <p className="font-mono text-sm mb-4" style={{ color: "#8b949e" }}>
          {personalInfo.terminalComment}
        </p>

        {/* Typewriter name */}
        <h1
          className="font-mono text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
          style={{ color: "#e6edf3" }}
          aria-label={personalInfo.name}
        >
          {nameChars.slice(0, displayedCount).map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
          {/* Blinking cursor — sits right after last typed character */}
          <motion.span
            className="inline-block ml-1"
            style={{ color: "#3fb950" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5] }}
            aria-hidden="true"
          >
            ▋
          </motion.span>
        </h1>

        {/* Role cycling */}
        <div className="mt-3 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="font-mono text-lg md:text-xl"
              style={{ color: "#58a6ff" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {personalInfo.roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-4 text-sm md:text-base" style={{ color: "#e6edf3" }}>
          {personalInfo.heroLead}
        </p>

        {/* Tagline */}
        <p className="mt-4 font-mono text-sm" style={{ color: "#8b949e" }}>
          {personalInfo.tagline}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-5 flex flex-wrap gap-3"
        >
          <span
            className="rounded-full px-3 py-1 font-mono text-xs"
            style={{ background: "#161b22", color: "#58a6ff", border: "1px solid #30363d" }}
          >
            {personalInfo.location}
          </span>
          <span
            className="rounded-full px-3 py-1 font-mono text-xs"
            style={{ background: "#161b22", color: "#3fb950", border: "1px solid #30363d" }}
          >
            {personalInfo.availabilityLabel}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
          className="mt-5 max-w-3xl rounded-md px-4 py-3"
          style={{ background: "#161b22", border: "1px solid #30363d" }}
        >
          <p className="font-mono text-[10px] tracking-widest" style={{ color: "#3fb950" }}>
            $ highlight --latest
          </p>
          <div className="mt-2 h-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={proofIndex}
                className="font-mono text-sm md:text-base"
                style={{ color: "#58a6ff" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {currentProof.slice(0, proofDisplayedCount)}
                {!prefersReducedMotion && (
                  <motion.span
                    className="inline-block ml-1"
                    style={{ color: "#3fb950" }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5] }}
                    aria-hidden="true"
                  >
                    ▋
                  </motion.span>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.16 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="font-mono text-sm px-6 py-3 rounded transition-opacity duration-200 hover:opacity-80"
            style={{ background: "#3fb950", color: "#0d1117" }}
          >
            {personalInfo.heroPrimaryCtaLabel}
          </button>
          <a
            href={contactHref}
            className="font-mono text-sm px-6 py-3 rounded border transition-colors duration-200"
            style={{ borderColor: "#30363d", color: "#e6edf3" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#58a6ff";
              (e.currentTarget as HTMLElement).style.color = "#58a6ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#30363d";
              (e.currentTarget as HTMLElement).style.color = "#e6edf3";
            }}
          >
            {personalInfo.heroSecondaryCtaLabel}
          </a>
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
            {personalInfo.heroGithubCtaLabel}
          </a>
        </motion.div>

        <div />
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
          <rect x="9" y="6" width="2" height="8" rx="1" fill="#3fb950" />
        </svg>
      </motion.div>
    </section>
  );
}
