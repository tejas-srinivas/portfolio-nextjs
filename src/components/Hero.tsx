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
      {/* Parallax text layer 1 - hidden on mobile */}
      <motion.div
        style={{ y: y1, willChange: "transform" }}
        className="pointer-events-none absolute inset-0 hidden items-center justify-center select-none md:flex"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[12vw] font-black leading-none tracking-tighter whitespace-nowrap"
          style={{ color: "#e6edf3", opacity: 0.04 }}
        >
          {personalInfo.name.toUpperCase()}
        </span>
      </motion.div>

      {/* Parallax text layer 2 - hidden on mobile */}
      <motion.div
        style={{ y: y2, willChange: "transform" }}
        className="pointer-events-none absolute inset-0 hidden items-center justify-center select-none md:flex"
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
            transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5] }}
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
          <rect x="9" y="6" width="2" height="8" rx="1" fill="#3fb950" />
        </svg>
      </motion.div>
    </section>
  );
}
