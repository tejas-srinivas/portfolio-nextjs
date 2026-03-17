"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxTextProps {
  text: string;
  direction: "left" | "right";
}

export default function ParallaxText({ text, direction }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // x is a MotionValue<number> in pixels, applied directly to Framer Motion x prop
  // 960px = 60rem at 16px base — provides enough travel across viewport widths
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-960, 960] : [960, -960]
  );

  // Repeat text 3× for seamless loop appearance
  const repeatedText = `${text}${text}${text}`;

  return (
    <div ref={ref} className="overflow-hidden py-3" aria-hidden="true">
      <motion.div
        style={{ x, willChange: "transform" }}
        className="flex whitespace-nowrap"
      >
        <span
          className="font-mono text-2xl font-bold tracking-widest md:text-4xl"
          style={{ color: "#3fb950", opacity: 0.3 }}
        >
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
