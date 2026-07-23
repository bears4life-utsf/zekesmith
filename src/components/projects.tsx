"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { site } from "@/content/site";

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Building
          </p>

          <div className="mt-5 space-y-1">
            <p className="text-base italic leading-relaxed tracking-[0.01em] text-muted/75 sm:text-[1.05rem]">
              Some ideas become essays.
            </p>
            <p className="text-base italic leading-relaxed tracking-[0.01em] text-muted/75 sm:text-[1.05rem]">
              Others become software.
            </p>
          </div>

          <h2
            id="projects-heading"
            className="mt-8 text-balance text-3xl font-medium tracking-tight text-foreground sm:mt-9 sm:text-4xl"
          >
            Experiments & side projects
          </h2>

          <div className="mt-5 max-w-xl space-y-1 text-pretty text-base leading-[1.7] text-muted sm:text-lg sm:leading-[1.7]">
            <p>Building is how I test ideas.</p>
            <p>
              Every project is an experiment in understanding how software, AI,
              and product thinking intersect.
            </p>
          </div>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted/85">
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
