"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  productLeadershipScenarios,
  simulatorClosingBody,
  simulatorClosingLead,
  type ScenarioOptionId,
} from "@/content/productLeadershipScenarios";
import { SectionHeading } from "@/components/section-heading";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function ProgressDots({
  total,
  current,
  enableMotion,
}: {
  total: number;
  current: number;
  enableMotion: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`Scenario ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        const isComplete = index < current;
        return (
          <motion.span
            key={index}
            layout={enableMotion}
            className={`h-1.5 rounded-full transition-colors duration-300 ${
              isActive
                ? "w-6 bg-foreground"
                : isComplete
                  ? "w-1.5 bg-foreground/45"
                  : "w-1.5 bg-border"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ProductLeadershipSimulator() {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  const enableMotion = isClient && reduceMotion !== true;
  const [hasStarted, setHasStarted] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] =
    useState<ScenarioOptionId | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const total = productLeadershipScenarios.length;
  const scenario = productLeadershipScenarios[scenarioIndex];
  const selectedOption = scenario?.options.find(
    (option) => option.id === selectedOptionId,
  );
  const preferredOption = scenario?.options.find(
    (option) => option.id === scenario.preferredOptionId,
  );
  const isLastScenario = scenarioIndex === total - 1;

  function handleSelect(optionId: ScenarioOptionId) {
    if (selectedOptionId) return;
    setSelectedOptionId(optionId);
  }

  function handleNext() {
    if (!selectedOptionId) return;
    if (isLastScenario) {
      setIsComplete(true);
      return;
    }
    setScenarioIndex((current) => current + 1);
    setSelectedOptionId(null);
  }

  function handleRestart() {
    setHasStarted(false);
    setScenarioIndex(0);
    setSelectedOptionId(null);
    setIsComplete(false);
  }

  const fade = enableMotion
    ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {};

  return (
    <section
      id="simulator"
      aria-labelledby="simulator-heading"
      className="scroll-mt-28 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 16 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            eyebrow="Interactive"
            id="simulator-heading"
            title="How Product Leaders Think"
            description="After nearly three decades building software products, I've learned that the hardest decisions rarely have perfect answers. Explore a few real-world scenarios and see how different tradeoffs shape the outcome."
          />
          <p className="mt-5 text-sm text-muted">
            Interactive exercise · About 3 minutes
          </p>
        </motion.div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            {!hasStarted ? (
              <motion.div
                key="intro"
                {...fade}
                className="rounded-2xl border border-border bg-background-elevated p-7 shadow-soft sm:p-10"
              >
                <p className="max-w-2xl text-pretty text-lg leading-[1.7] text-foreground sm:text-xl">
                  Most people think product leadership is about roadmaps and
                  features.
                </p>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-[1.7] text-muted sm:text-lg">
                  In reality, it is usually about navigating tradeoffs:
                </p>
                <ul className="mt-5 max-w-2xl space-y-2.5 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {[
                    "Speed versus quality",
                    "Customers versus strategy",
                    "Short-term commitments versus long-term health",
                    "Innovation versus focus",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-[1.7] text-muted sm:text-lg">
                  These scenarios are inspired by the kinds of decisions product
                  teams face every day.
                </p>
                <button
                  type="button"
                  onClick={() => setHasStarted(true)}
                  className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Start exploring
                </button>
              </motion.div>
            ) : isComplete ? (
              <motion.div
                key="complete"
                {...fade}
                className="rounded-2xl border border-border bg-background-elevated p-7 shadow-soft sm:p-10"
              >
                <p className="max-w-2xl text-pretty text-2xl font-medium leading-[1.35] tracking-tight text-foreground sm:text-3xl">
                  {simulatorClosingLead}
                </p>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-[1.7] text-muted sm:text-lg">
                  {simulatorClosingBody}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Explore again
                  </button>
                  <a
                    href="#writing"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    View my writing
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={scenario.id}
                {...fade}
                className="rounded-2xl border border-border bg-background-elevated p-6 shadow-soft sm:p-8 lg:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                      {scenario.category}
                    </p>
                    <h3 className="mt-3 max-w-2xl text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                      {scenario.title}
                    </h3>
                  </div>
                  <div className="pt-1">
                    <ProgressDots
                      total={total}
                      current={scenarioIndex}
                      enableMotion={enableMotion}
                    />
                    <p className="mt-2 text-right text-xs text-muted">
                      Scenario {scenarioIndex + 1} of {total}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 rounded-2xl border border-border bg-background p-4 sm:grid-cols-2 sm:gap-6 sm:p-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      Stakeholders
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                      {scenario.stakeholders.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-foreground/40"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      Constraints
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                      {scenario.constraints.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-foreground/40"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-pretty text-base leading-[1.7] text-muted sm:text-lg">
                  {scenario.situation}
                </p>

                <div className="mt-10 border-t border-border pt-8">
                  <h4 className="text-lg font-medium tracking-tight text-foreground">
                    What would you do?
                  </h4>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    Choose a response to reveal the tradeoffs and compare your
                    instincts with mine.
                  </p>

                  <fieldset className="mt-6 border-0 p-0">
                    <legend className="sr-only">
                      Choose a response for {scenario.title}
                    </legend>
                    <div
                      className="grid gap-3"
                      role="radiogroup"
                      aria-label="Response options"
                    >
                      {scenario.options.map((option) => {
                        const isSelected = selectedOptionId === option.id;
                        const isMuted =
                          selectedOptionId !== null && !isSelected;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            aria-disabled={selectedOptionId !== null}
                            disabled={selectedOptionId !== null}
                            onClick={() => handleSelect(option.id)}
                            className={`group/option rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,box-shadow,transform,opacity] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 ${
                              isSelected
                                ? "border-foreground/30 bg-accent-soft shadow-soft"
                                : isMuted
                                  ? "border-border/70 bg-background opacity-50"
                                  : "border-border bg-background hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft motion-reduce:hover:translate-y-0"
                            } disabled:cursor-default`}
                          >
                            <span className="inline-flex rounded-full border border-border bg-background-elevated px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted">
                              {option.lens}
                            </span>
                            <span className="mt-3 block text-sm leading-relaxed text-foreground sm:text-base">
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <AnimatePresence>
                  {selectedOption && preferredOption ? (
                    <motion.div
                      key={`${scenario.id}-${selectedOption.id}-analysis`}
                      initial={enableMotion ? { opacity: 0, y: 12 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mt-8 space-y-7 rounded-2xl border border-border bg-background p-5 sm:p-7"
                      aria-live="polite"
                    >
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                          Your choice
                        </p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground sm:text-base">
                          {selectedOption.lens} — {selectedOption.label}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                          {selectedOption.analysis}
                        </p>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                            Likely upside
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                            {selectedOption.upside}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                            Primary risk
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                            {selectedOption.risk}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-border pt-6">
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                          How I would think about it
                        </p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground sm:text-base">
                          {preferredOption.lens} — {preferredOption.label}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                          {scenario.myApproach}
                        </p>
                        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
                          Strong product leadership is rarely about finding the
                          perfect answer. Context matters.
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedOptionId}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {isLastScenario ? "Finish" : "Next scenario"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
