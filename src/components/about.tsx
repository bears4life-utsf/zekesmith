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
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
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
                alt="Professional portrait of Zeke Smith"
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
                title="Product leadership, builder instincts"
              />
              <p className="mt-8 max-w-xl text-pretty text-base leading-[1.7] text-muted sm:text-lg sm:leading-[1.7]">
                {site.about.bio}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
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
