"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const isLive = project.status === "live" && Boolean(project.url);

  const card = (
    <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-soft transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:border-foreground/15 group-hover:shadow-hover">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[#efeee9]">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          style={{ background: project.visual }}
          aria-hidden="true"
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full border border-border bg-background-elevated/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted shadow-soft backdrop-blur-sm">
            {project.status === "live" ? "Live" : "Coming soon"}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div
            className="h-px w-12 opacity-70"
            style={{ backgroundColor: project.accent }}
          />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground">
              {project.title}
            </h3>
          </div>
          {isLive ? (
            <span
              aria-hidden="true"
              className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-foreground/25 group-hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </div>
  );

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {isLive ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={`${project.title} — opens in a new tab`}
        >
          {card}
        </a>
      ) : (
        <div className="group block" aria-label={`${project.title} — coming soon`}>
          {card}
        </div>
      )}
    </motion.article>
  );
}
