"use client";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  const headerTransition: Transition = { duration: 0.5, ease: "easeOut" };

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
        transition={headerTransition}
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

        {experience.map((entry, index) => {
          const entryTransition: Transition = { duration: 0.5, ease: "easeOut", delay: index * 0.1 };
          return (
            <motion.div
              key={`${entry.company}-${entry.role}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={entryTransition}
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
          );
        })}
      </div>
    </section>
  );
}
