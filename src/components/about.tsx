"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-border bg-[color-mix(in_srgb,var(--background-elevated)_40%,var(--background))]"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8 sm:py-32">
        <motion.blockquote
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl border-l border-accent/40 pl-5 sm:pl-6"
        >
          <p className="font-serif text-2xl leading-snug tracking-tight text-foreground sm:text-3xl sm:leading-snug">
            {site.about.pullQuote}
          </p>
        </motion.blockquote>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10"
          >
            <div className="relative mx-auto aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-2xl border border-border bg-[#efeee9] shadow-soft sm:mx-0 sm:w-44 lg:w-48">
              <Image
                src="/images/zeke-headshot.jpg"
                alt="Professional portrait of Zeke S. Smith"
                fill
                sizes="(max-width: 640px) 160px, 192px"
                className="object-cover object-top"
                priority={false}
              />
            </div>

            <div className="min-w-0 flex-1">
              <SectionHeading
                eyebrow="About"
                id="about-heading"
                title={site.about.title}
              />
              <div className="mt-8 max-w-xl space-y-5 text-pretty text-base leading-[1.7] text-muted sm:text-lg sm:leading-[1.7]">
                {site.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:pt-2"
          >
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Current curiosities
            </h3>
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
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
