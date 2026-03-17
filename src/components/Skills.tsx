"use client";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
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
        transition={{ duration: 0.5, ease: "easeOut" } as Transition}
        className="font-mono text-xs tracking-widest mb-12"
        style={{ color: "#3fb950" }}
      >
        $ cat skills.json
      </motion.p>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, groupIndex) => {
          const groupTransition: Transition = { duration: 0.5, ease: "easeOut", delay: groupIndex * 0.1 };
          return (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={groupTransition}
            >
              <p
                className="font-mono text-xs tracking-widest mb-4"
                style={{ color: group.color }}
              >
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills[group.key].map((skill, i) => {
                  const pillTransition: Transition = { duration: 0.3, ease: "easeOut", delay: groupIndex * 0.1 + i * 0.04 };
                  return (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={pillTransition}
                      className="font-mono text-xs px-3 py-1 rounded-full cursor-default"
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
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
