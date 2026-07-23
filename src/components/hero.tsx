"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const ids = site.hero.exploring.items.map((item) =>
      item.href.replace("#", ""),
    );
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
      className="relative isolate overflow-hidden"
    >
      <div className="hero-atmosphere absolute inset-0 -z-20" aria-hidden="true" />
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-6xl px-5 pt-32 sm:px-8 lg:pt-36">
        {/* Masthead sits above the grid so the aside can align with the H1, not this block. */}
        <motion.div {...fadeUp(0)} className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {site.hero.masthead.name}
          </p>
          <p className="mt-2 text-sm text-muted/80">
            {site.hero.masthead.roles}
          </p>
        </motion.div>

        {/* Grid starts at H1 row — aside border-l shares that top edge. */}
        <div className="mt-8 grid items-start gap-12 sm:mt-9 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-16">
          <div className="max-w-3xl">
            <motion.h1
              id="hero-heading"
              {...fadeUp(0.08)}
              className="text-balance text-4xl font-medium leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[3.15rem]"
            >
              {site.hero.headline}
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-8 max-w-2xl text-pretty text-lg leading-[1.7] text-muted sm:text-xl sm:leading-[1.7]"
            >
              {site.hero.supporting}
            </motion.p>

            <motion.div
              {...fadeUp(0.24)}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <a
                href="#tradeoffs"
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-300 ease-out hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Explore the mental model
              </a>
              <a
                href="#writing"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background-elevated px-5 text-sm font-medium text-foreground shadow-soft transition-[border-color,background-color,color] duration-300 ease-out hover:border-accent/35 hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Read the writing
              </a>
            </motion.div>

            {/* Tighter CTA→subtext gap; slightly stronger muted so it stays readable but secondary. */}
            <motion.p
              {...fadeUp(0.3)}
              className="mt-3 max-w-xl text-sm leading-relaxed text-muted/85 sm:mt-4"
            >
              {site.hero.credibility}
            </motion.p>
          </div>

          <motion.aside
            {...fadeUp(0.2)}
            className="hidden lg:block"
            aria-label={site.hero.exploring.title}
          >
            <div className="border-l border-accent/35 pl-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {site.hero.exploring.title}
              </p>
              <ul className="mt-5 space-y-1">
                {site.hero.exploring.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      data-active={activeHref === item.href}
                      /* Default ~AA body contrast; active adds accent + wash (not color-only). */
                      className="exploring-item block rounded-md px-2 py-1.5 text-sm leading-snug text-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mt-5 h-5 bg-gradient-to-b from-transparent to-[color-mix(in_srgb,var(--background-elevated)_55%,var(--background))] sm:mt-6 sm:h-6"
      />
    </section>
  );
}
