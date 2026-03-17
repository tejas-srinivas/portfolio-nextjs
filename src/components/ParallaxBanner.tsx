"use client";
import ParallaxText from "@/components/ParallaxText";
import { marqueeText } from "@/lib/data";

export default function ParallaxBanner() {
  return (
    <section
      className="py-6 overflow-hidden"
      style={{ background: "#0d1117", borderTop: "1px solid #30363d", borderBottom: "1px solid #30363d" }}
    >
      <ParallaxText text={marqueeText} direction="left" />
      <ParallaxText text={marqueeText} direction="right" />
    </section>
  );
}
