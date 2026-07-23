"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  productLeadershipScenarios,
  simulatorClosing,
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

export function ProductLeadershipSimulator() {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  const enableMotion = isClient && reduceMotion !== true;
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
    setScenarioIndex(0);
    setSelectedOptionId(null);
    setIsComplete(false);
  }

  const fade = enableMotion
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
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
            title="Product Leadership Simulator"
            description="Product decisions rarely have perfect answers. Choose a response and explore the tradeoffs."
          />
        </motion.div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="complete"
                {...fade}
                className="rounded-2xl border border-border bg-background-elevated p-7 shadow-soft sm:p-10"
              >
                <p className="max-w-2xl text-pretty text-lg leading-[1.7] text-foreground sm:text-xl">
                  {simulatorClosing}
                </p>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Explore again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={scenario.id}
                {...fade}
                className="rounded-2xl border border-border bg-background-elevated p-6 shadow-soft sm:p-8 lg:p-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {scenario.category}
                  </p>
                  <p className="text-xs text-muted" aria-live="polite">
                    Scenario {scenarioIndex + 1} of {total}
                  </p>
                </div>

                <h3 className="mt-4 text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {scenario.title}
                </h3>
                <p className="mt-4 max-w-3xl text-pretty text-base leading-[1.7] text-muted sm:text-lg">
                  {scenario.situation}
                </p>

                <fieldset className="mt-8 border-0 p-0">
                  <legend className="sr-only">
                    Choose a response for {scenario.title}
                  </legend>
                  <div className="grid gap-3" role="radiogroup" aria-label="Response options">
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
                          className={`rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,box-shadow,transform,opacity] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 ${
                            isSelected
                              ? "border-foreground/25 bg-accent-soft shadow-soft"
                              : isMuted
                                ? "border-border/70 bg-background opacity-55"
                                : "border-border bg-background hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-soft motion-reduce:hover:translate-y-0"
                          } disabled:cursor-default`}
                        >
                          <span className="block text-xs font-medium uppercase tracking-[0.12em] text-muted">
                            Option {option.id}
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-foreground sm:text-base">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <AnimatePresence>
                  {selectedOption && preferredOption ? (
                    <motion.div
                      key={`${scenario.id}-${selectedOption.id}-analysis`}
                      initial={enableMotion ? { opacity: 0, y: 8 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mt-8 space-y-6 rounded-2xl border border-border bg-background p-5 sm:p-6"
                      aria-live="polite"
                    >
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                          Your choice
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                          Option {selectedOption.id}: {selectedOption.label}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                          {selectedOption.analysis}
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
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

                      <div className="border-t border-border pt-5">
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                          My approach
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                          Option {preferredOption.id}: {preferredOption.label}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                          {scenario.myApproach}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-muted/90 sm:text-base">
                          Context can change the decision. The goal is not a
                          perfect answer — it is making the tradeoffs visible
                          and choosing intentionally.
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
                  {selectedOptionId ? (
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Start over
                    </button>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
