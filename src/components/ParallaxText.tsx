"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface ParallaxTextProps {
  text: string;
  direction: "left" | "right";
  duration?: number;
  color?: string;
  opacity?: number;
}

export default function ParallaxText({
  text,
  direction,
  duration = 28,
  color = "#3fb950",
  opacity = 0.3,
}: ParallaxTextProps) {
  const prefersReducedMotion = useReducedMotion();
  // Two copies side-by-side; animating x by -50% moves exactly one copy,
  // creating a perfectly seamless continuous loop.
  const repeated = `${text}${text}`;

  return (
    <div className="overflow-hidden py-3" aria-hidden="true">
      <motion.div
        className="flex whitespace-nowrap"
        animate={
          prefersReducedMotion
            ? { x: "0%" }
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { repeat: Infinity, ease: "linear", duration }
        }
        style={{ willChange: "transform" }}
      >
        <span
          className="font-mono text-2xl font-bold tracking-widest md:text-4xl"
          style={{ color, opacity }}
        >
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}
