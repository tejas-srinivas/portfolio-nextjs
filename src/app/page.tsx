import Hero from "@/components/Hero";
import ParallaxBanner from "@/components/ParallaxBanner";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ background: "#0d1117" }}>
      <Hero />
      <ParallaxBanner />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
