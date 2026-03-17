"use client";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { personalInfo } from "@/lib/data";

const CONTACTS = [
  {
    label: "email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    label: "linkedin",
    value: personalInfo.linkedinHandle,
    href: personalInfo.linkedin,
  },
  {
    label: "github",
    value: personalInfo.githubHandle,
    href: personalInfo.github,
  },
];

export default function Contact() {
  const headerTransition: Transition = { duration: 0.5, ease: "easeOut" };

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
        transition={headerTransition}
        className="font-mono text-xs tracking-widest mb-4"
        style={{ color: "#3fb950" }}
      >
        $ contact --tejas
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 } as Transition}
        className="font-mono text-2xl font-bold mb-12 md:text-3xl"
        style={{ color: "#e6edf3" }}
      >
        {personalInfo.contactTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 } as Transition}
        className="mx-auto mb-10 max-w-3xl text-sm leading-relaxed md:text-base"
        style={{ color: "#8b949e" }}
      >
        {personalInfo.contactMessage}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 } as Transition}
        className="mx-auto mb-10 flex w-full max-w-2xl flex-col gap-4 rounded-lg p-5 text-left md:flex-row md:items-center md:justify-between"
        style={{ background: "#161b22", border: "1px solid #30363d" }}
      >
        <div>
          <p className="font-mono text-xs tracking-widest" style={{ color: "#58a6ff" }}>
            {personalInfo.availabilityKeyLabel}
          </p>
          <p className="mt-2 font-mono text-sm" style={{ color: "#3fb950" }}>
            {personalInfo.availabilityLabel}
          </p>
        </div>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex w-fit items-center justify-center rounded px-5 py-2.5 font-mono text-sm transition-opacity duration-200 hover:opacity-80"
          style={{ background: "#3fb950", color: "#0d1117" }}
        >
          {personalInfo.emailCtaLabel}
        </a>
      </motion.div>

      <div className="flex flex-col items-center gap-4">
        {CONTACTS.map((contact, i) => {
          const linkTransition: Transition = { duration: 0.4, ease: "easeOut", delay: 0.2 + i * 0.1 };
          return (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.label !== "email" ? "_blank" : undefined}
              rel={contact.label !== "email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={linkTransition}
              className="group flex items-center gap-3 font-mono text-sm"
              style={{ color: "#8b949e" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#3fb950")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8b949e")}
            >
              <span style={{ color: "#3fb950" }}>→</span>
              <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-current transition-colors duration-200">
                {contact.value}
              </span>
            </motion.a>
          );
        })}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 } as Transition}
        className="mt-20 font-mono text-xs"
        style={{ color: "#8b949e" }}
      >
        © 2026 Tejas Srinivasulu · Built with Next.js + Framer Motion
      </motion.p>
    </section>
  );
}
