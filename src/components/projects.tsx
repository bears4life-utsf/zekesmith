"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:ml-auto lg:max-w-xl lg:text-right"
        >
          <SectionHeading
            eyebrow="Ideas in practice"
            id="projects-heading"
            title="Experiments and side projects"
            description="Small experiments exploring AI, history, games, recommendations, and the edges of software — building as a way of thinking."
          />
          <p className="mt-5 text-sm leading-relaxed text-muted lg:ml-auto lg:max-w-sm">
            {site.projects.aside}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
