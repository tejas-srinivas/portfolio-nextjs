"use client";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { projects, Project } from "@/lib/data";

// Map tech names to badge colors
const getTechColor = (tech: string): string => {
  const t = tech.toLowerCase();
  if (["react", "next", "tailwind", "framer", "apollo", "redux", "shadcn"].some(f => t.includes(f)))
    return "#3fb950"; // green — frontend
  if (["aws", "s3", "sqs", "lambda", "transcribe", "translate", "docker", "kubernetes"].some(f => t.includes(f)))
    return "#ffa657"; // orange — cloud/infra
  return "#58a6ff"; // blue — backend/default
};

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const transition: Transition = { duration: 0.5, ease: "easeOut", delay: index * 0.12 };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      className={`rounded-lg p-6 flex flex-col ${featured ? "md:row-span-2" : ""}`}
      style={{ background: "#161b22", border: "1px solid #30363d" }}
    >
      {/* Header */}
      <div>
        <p className="font-mono text-xs tracking-widest mb-2" style={{ color: "#8b949e" }}>
          $ project --name
        </p>
        <h3 className="font-mono text-base font-bold leading-snug" style={{ color: "#e6edf3" }}>
          {project.name}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "#8b949e" }}>
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-1 rounded"
            style={{ background: "#21262d", color: getTechColor(tech) }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Metric */}
      <p className="mt-4 font-mono text-xs" style={{ color: "#3fb950" }}>
        ↓ {project.metric}
      </p>

      {/* GitHub link — only if github is provided */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on GitHub`}
          className="mt-4 inline-flex items-center gap-2 font-mono text-xs transition-colors duration-200"
          style={{ color: "#8b949e" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#3fb950")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8b949e")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
          </svg>
          GitHub ↗
        </a>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const headerTransition: Transition = { duration: 0.5, ease: "easeOut" };

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-6 py-24 md:px-16"
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={headerTransition}
        className="font-mono text-xs tracking-widest mb-8"
        style={{ color: "#3fb950" }}
      >
        $ ls projects/
      </motion.p>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
        {featured && <ProjectCard project={featured} index={0} featured />}
        {rest.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i + 1} />
        ))}

        {/* Placeholder tile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: (rest.length + 1) * 0.12 } as Transition}
          className="rounded-lg p-6 flex items-center justify-center"
          style={{ background: "transparent", border: "1px dashed #30363d" }}
        >
          <p className="font-mono text-sm" style={{ color: "#30363d" }}>
            + more coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
