"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  productLeadershipScenarios,
  type ProductLeadershipScenario,
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

function getCommentary(
  value: number,
  commentary: { left: string; balanced: string; right: string },
) {
  if (value < 38) return commentary.left;
  if (value > 62) return commentary.right;
  return commentary.balanced;
}

function TensionMap({
  scenario,
  values,
}: {
  scenario: ProductLeadershipScenario;
  values: Record<string, number>;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
        Tradeoff map
      </p>
      <p className="mt-2 text-sm text-muted">
        Where your current emphasis sits across the tensions in this decision.
      </p>
      <div className="mt-5 space-y-4">
        {scenario.tradeoffs.map((tradeoff) => {
          const value = values[tradeoff.id] ?? tradeoff.defaultValue;
          return (
            <div key={tradeoff.id}>
              <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted">
                <span>{tradeoff.left}</span>
                <span>{tradeoff.right}</span>
              </div>
              <div className="relative h-2 rounded-full bg-border/70">
                <div
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-foreground/20 bg-foreground shadow-soft transition-[left] duration-300 ease-out"
                  style={{ left: `calc(${value}% - 0.4375rem)` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductLeadershipSimulator() {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  const enableMotion = isClient && reduceMotion !== true;

  const [activeId, setActiveId] = useState(productLeadershipScenarios[0].id);
  const [exploredOptionId, setExploredOptionId] =
    useState<ScenarioOptionId | null>(null);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const scenario of productLeadershipScenarios) {
      for (const tradeoff of scenario.tradeoffs) {
        initial[`${scenario.id}:${tradeoff.id}`] = tradeoff.defaultValue;
      }
    }
    return initial;
  });

  const scenario =
    productLeadershipScenarios.find((item) => item.id === activeId) ??
    productLeadershipScenarios[0];

  const currentValues = useMemo(() => {
    const values: Record<string, number> = {};
    for (const tradeoff of scenario.tradeoffs) {
      values[tradeoff.id] =
        sliderValues[`${scenario.id}:${tradeoff.id}`] ?? tradeoff.defaultValue;
    }
    return values;
  }, [scenario, sliderValues]);

  const preferredOption = scenario.options.find(
    (option) => option.id === scenario.preferredOptionId,
  );
  const exploredOption = scenario.options.find(
    (option) => option.id === exploredOptionId,
  );

  const liveNotes = scenario.tradeoffs.map((tradeoff) =>
    getCommentary(currentValues[tradeoff.id] ?? 50, tradeoff.commentary),
  );

  function selectScenario(id: string) {
    setActiveId(id);
    setExploredOptionId(null);
  }

  function updateSlider(tradeoffId: string, value: number) {
    setSliderValues((current) => ({
      ...current,
      [`${scenario.id}:${tradeoffId}`]: value,
    }));
  }

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
            eyebrow="Decision lab"
            id="simulator-heading"
            title="How Product Leaders Think"
            description="After nearly three decades building software products, I've learned that the hardest decisions rarely have perfect answers. Explore a few real-world scenarios and see how different tradeoffs shape the outcome."
          />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            This is a strategy workbench, not a test. Browse any scenario, move
            the tensions, and compare approaches — in any order.
          </p>
        </motion.div>

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Choose a scenario
          </p>
          <div
            className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Product leadership scenarios"
          >
            {productLeadershipScenarios.map((item) => {
              const isActive = item.id === scenario.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectScenario(item.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-[border-color,background-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive
                      ? "border-foreground/20 bg-foreground text-background"
                      : "border-border bg-background-elevated text-muted hover:border-foreground/15 hover:text-foreground"
                  }`}
                >
                  {item.navLabel}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={enableMotion ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={enableMotion ? { opacity: 0, y: -8 } : undefined}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 space-y-6"
          >
            <article className="rounded-2xl border border-border bg-background-elevated p-6 shadow-soft sm:p-8 lg:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {scenario.category}
              </p>
              <h3 className="mt-3 max-w-3xl text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                {scenario.title}
              </h3>
              <p className="mt-5 max-w-3xl text-pretty text-base leading-[1.7] text-muted sm:text-lg">
                {scenario.situation}
              </p>

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
            </article>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-border bg-background-elevated p-6 shadow-soft sm:p-8">
                <h4 className="text-lg font-medium tracking-tight text-foreground">
                  Work the tensions
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  Move the sliders to feel the competing forces. Nothing is
                  scored — this is a thinking tool.
                </p>

                <div className="mt-8 space-y-8">
                  {scenario.tradeoffs.map((tradeoff) => {
                    const value = currentValues[tradeoff.id] ?? 50;
                    const note = getCommentary(value, tradeoff.commentary);
                    return (
                      <div key={tradeoff.id}>
                        <div className="flex items-center justify-between gap-4 text-sm text-foreground">
                          <span>{tradeoff.left}</span>
                          <span className="text-right">{tradeoff.right}</span>
                        </div>
                        <label className="sr-only" htmlFor={`${scenario.id}-${tradeoff.id}`}>
                          Balance {tradeoff.left} and {tradeoff.right}
                        </label>
                        <input
                          id={`${scenario.id}-${tradeoff.id}`}
                          type="range"
                          min={0}
                          max={100}
                          value={value}
                          onChange={(event) =>
                            updateSlider(tradeoff.id, Number(event.target.value))
                          }
                          className="tradeoff-slider mt-4 w-full"
                        />
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {note}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-2xl border border-border bg-background p-4 sm:p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                    Current emphasis
                  </p>
                  <ul className="mt-3 space-y-2">
                    {liveNotes.map((note) => (
                      <li
                        key={note}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <TensionMap scenario={scenario} values={currentValues} />

                <div className="rounded-2xl border border-border bg-background-elevated p-6 shadow-soft sm:p-7">
                  <h4 className="text-lg font-medium tracking-tight text-foreground">
                    How I think about this
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {scenario.myApproach}
                  </p>

                  <div className="mt-6 space-y-5 border-t border-border pt-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                        What I optimize for
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {scenario.thinking.optimizeFor}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                        What concerns me most
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {scenario.thinking.concerns}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                        Key principle
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        “{scenario.thinking.keyPrinciple}”
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                        Common mistake
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {scenario.thinking.commonMistake}
                      </p>
                    </div>
                  </div>

                  {preferredOption ? (
                    <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted">
                      In this case, I tend toward{" "}
                      <span className="text-foreground">
                        {preferredOption.lens.toLowerCase()}
                      </span>
                      : {preferredOption.label}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background-elevated p-6 shadow-soft sm:p-8">
              <h4 className="text-lg font-medium tracking-tight text-foreground">
                Alternative paths worth examining
              </h4>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                These are not answers to grade. They are lenses. Open any one to
                inspect the upside and risk.
              </p>

              <div className="mt-6 grid gap-3">
                {scenario.options.map((option) => {
                  const isOpen = exploredOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setExploredOptionId(isOpen ? null : option.id)
                      }
                      className={`rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 ${
                        isOpen
                          ? "border-foreground/25 bg-accent-soft shadow-soft"
                          : "border-border bg-background hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-soft motion-reduce:hover:translate-y-0"
                      }`}
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

              <AnimatePresence>
                {exploredOption ? (
                  <motion.div
                    key={`${scenario.id}-${exploredOption.id}`}
                    initial={enableMotion ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={enableMotion ? { opacity: 0, y: -6 } : undefined}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 space-y-5 rounded-2xl border border-border bg-background p-5 sm:p-6"
                    aria-live="polite"
                  >
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                        Tradeoff view
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                        {exploredOption.analysis}
                      </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                          Likely upside
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                          {exploredOption.upside}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                          Primary risk
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                          {exploredOption.risk}
                        </p>
                      </div>
                    </div>
                    <p className="border-t border-border pt-5 text-sm leading-relaxed text-muted">
                      Strong product leadership is rarely about finding the
                      perfect answer. Context matters.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
