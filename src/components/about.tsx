"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="About"
              id="about-heading"
              title="Product leadership, builder instincts"
            />
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              {site.about.bio}
            </motion.p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border bg-background-elevated p-7 shadow-soft sm:p-8"
          >
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Current interests
            </h3>
            <ul className="mt-6 space-y-3">
              {site.about.interests.map((interest) => (
                <li
                  key={interest}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {interest}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
