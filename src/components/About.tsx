"use client";
import { motion, type Transition } from "framer-motion";
import { personalInfo, education } from "@/lib/data";

const SECTION_REVEAL = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.5, ease: "easeOut" } as Transition,
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
        <motion.div
          {...SECTION_REVEAL}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 } as Transition}
        >
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
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 } as Transition}
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
                <span style={{ color: key === "status" ? "#3fb950" : "#e6edf3" }}>
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
