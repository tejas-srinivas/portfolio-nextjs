"use client";
import ParallaxText from "@/components/ParallaxText";
import { marqueeRows } from "@/lib/data";

export default function ParallaxBanner() {
  return (
    <section
      className="py-6 overflow-hidden"
      style={{ background: "#0d1117", borderTop: "1px solid #30363d", borderBottom: "1px solid #30363d" }}
    >
      {marqueeRows.map((row) => (
        <ParallaxText
          key={`${row.direction}-${row.text}`}
          text={row.text}
          direction={row.direction}
          duration={row.duration}
          color={row.color}
          opacity={row.opacity}
        />
      ))}
    </section>
  );
}
