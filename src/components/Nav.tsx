"use client";
import { useScroll, useTransform, motion, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { personalInfo } from "@/lib/data";

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
  const opacity = useMotionValue(0);
  useEffect(() => {
    const threshold = window.innerHeight * 0.9;
    return scrollY.on("change", (y) => {
      if (y < threshold - 80) {
        opacity.set(0);
      } else if (y > threshold) {
        opacity.set(1);
      } else {
        opacity.set((y - (threshold - 80)) / 80);
      }
    });
  }, [scrollY, opacity]);
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
          background: "rgba(13,17,23,0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #30363d",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <span className="font-mono text-sm" style={{ color: "#3fb950" }}>
            {personalInfo.siteHandle}
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
          {/* Note: plain <span> elements below — CSS transitions intentional, not motion.* elements */}
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
