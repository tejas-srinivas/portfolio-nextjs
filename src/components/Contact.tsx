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
        Get In Touch
      </motion.h2>

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
        style={{ color: "#30363d" }}
      >
        © 2026 Tejas Srinivasulu · Built with Next.js + Framer Motion
      </motion.p>
    </section>
  );
}
