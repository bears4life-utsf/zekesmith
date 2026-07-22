"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.65,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <div className="hero-atmosphere absolute inset-0 -z-20" aria-hidden="true" />
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-5 pb-28 pt-32 sm:px-8 lg:pb-32 lg:pt-28">
        <div className="max-w-2xl">
          <motion.p
            {...fadeUp(0)}
            className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl"
          >
            {site.name}
          </motion.p>

          <motion.h1
            id="hero-heading"
            {...fadeUp(0.08)}
            className="mt-10 text-balance text-4xl font-medium leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
          >
            {site.hero.headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-8 max-w-xl text-pretty text-lg leading-[1.7] text-muted sm:text-xl sm:leading-[1.7]"
          >
            {site.hero.supporting}
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-300 ease-out hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              See what I&apos;m building
            </a>
            <a
              href="#writing"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background-elevated px-5 text-sm font-medium text-foreground shadow-soft transition-[border-color,background-color] duration-300 ease-out hover:border-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Read the writing
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
