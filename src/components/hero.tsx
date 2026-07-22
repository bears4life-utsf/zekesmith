"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
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

      <div
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full max-w-3xl opacity-80 lg:opacity-100"
        aria-hidden="true"
      >
        <div className="animate-pulse-glow absolute right-[-10%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.22),transparent_65%)] blur-2xl" />
        <div className="animate-float-soft absolute right-[8%] top-[26%] h-72 w-72 rounded-full border border-foreground/10" />
        <div className="absolute right-[22%] top-[38%] h-40 w-40 rounded-full border border-accent/25" />
        <div className="absolute bottom-[22%] right-[18%] h-24 w-56 rounded-2xl border border-foreground/10 bg-foreground/[0.03]" />
        <div className="absolute bottom-[32%] right-[8%] h-16 w-16 rounded-xl border border-sky-400/20 bg-sky-400/10" />
      </div>

      <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-5 pb-24 pt-28 sm:px-8 lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <motion.p
            {...fadeUp(0)}
            className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            {site.name}
          </motion.p>

          <motion.h1
            id="hero-heading"
            {...fadeUp(0.08)}
            className="mt-8 text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem]"
          >
            {site.hero.headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.hero.supporting}
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              See what I&apos;m building
            </a>
            <a
              href="#writing"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background-elevated/40 px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Read the writing
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
