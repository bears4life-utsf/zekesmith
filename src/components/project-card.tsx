"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { useEnableMotion } from "@/lib/motion";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const enableMotion = useEnableMotion();
  const isLive = project.status === "live" && Boolean(project.url);

  const card = (
    <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-soft transition-[border-color,transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-foreground/12 group-hover:shadow-hover motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[#efeee9]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          priority={index === 0}
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full border border-border bg-background-elevated/92 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted shadow-soft backdrop-blur-sm">
            {project.status === "live" ? "Live" : "Coming soon"}
          </span>
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
              className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-foreground/25 group-hover:text-foreground motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
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
      initial={enableMotion ? { opacity: 1, y: 14 } : false}
      whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
