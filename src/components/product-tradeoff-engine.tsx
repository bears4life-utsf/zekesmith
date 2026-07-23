"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  DEFAULT_INPUTS,
  PRESETS,
  PRESET_TINT_VAR,
  PRINCIPLES,
  PRINCIPLE_TINT_VAR,
  SCENARIO_QUERY_PARAM,
  SLIDER_DEFINITIONS,
  computeOutputs,
  getPresetBySlug,
  getReflection,
  matchPreset,
  type PresetId,
  type SliderId,
  type SliderInputs,
} from "@/lib/productTradeoffEngine";
import { SectionHeading } from "@/components/section-heading";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function readScenarioInputsFromUrl(): SliderInputs | null {
  if (typeof window === "undefined") return null;
  const slug = new URLSearchParams(window.location.search).get(
    SCENARIO_QUERY_PARAM,
  );
  if (!slug) return null;
  return getPresetBySlug(slug)?.inputs ?? null;
}

function syncScenarioToUrl(presetId: PresetId | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (presetId) {
    const preset = PRESETS.find((item) => item.id === presetId);
    if (preset) {
      url.searchParams.set(SCENARIO_QUERY_PARAM, preset.slug);
    }
  } else {
    url.searchParams.delete(SCENARIO_QUERY_PARAM);
  }
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    window.history.replaceState(null, "", next);
  }
}

export function ProductTradeoffEngine() {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  const enableMotion = isClient && reduceMotion !== true;
  const principlesTitleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const didHydrateUrl = useRef(false);

  const [inputs, setInputs] = useState<SliderInputs>(DEFAULT_INPUTS);
  const [activeSliderId, setActiveSliderId] =
    useState<SliderId>("deliverySpeed");
  const [principlesOpen, setPrinciplesOpen] = useState(false);

  const outputs = useMemo(() => computeOutputs(inputs), [inputs]);
  const reflection = useMemo(
    () => getReflection(inputs, outputs),
    [inputs, outputs],
  );
  const activePreset = useMemo(() => matchPreset(inputs), [inputs]);
  const activePresetMeta = useMemo(
    () => PRESETS.find((preset) => preset.id === activePreset) ?? null,
    [activePreset],
  );
  const activeSlider = useMemo(
    () =>
      SLIDER_DEFINITIONS.find((slider) => slider.id === activeSliderId) ??
      SLIDER_DEFINITIONS[0],
    [activeSliderId],
  );

  useEffect(() => {
    const fromUrl = readScenarioInputsFromUrl();
    if (fromUrl) setInputs(fromUrl);
    didHydrateUrl.current = true;
  }, []);

  useEffect(() => {
    if (!didHydrateUrl.current) return;
    syncScenarioToUrl(activePreset);
  }, [activePreset]);

  useEffect(() => {
    function onPopState() {
      const fromUrl = readScenarioInputsFromUrl();
      if (fromUrl) setInputs(fromUrl);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (principlesOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [principlesOpen]);

  function updateSlider(id: SliderId, value: number) {
    setActiveSliderId(id);
    setInputs((prev) => ({ ...prev, [id]: value }));
  }

  function applyPreset(id: PresetId) {
    const preset = PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setInputs(preset.inputs);
  }

  return (
    <section
      id="tradeoffs"
      aria-labelledby="tradeoffs-heading"
      className="relative scroll-mt-24"
    >
      <div className="border-b border-t border-border bg-[color-mix(in_srgb,var(--background-elevated)_62%,var(--background))]">
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 lg:pt-14">
          <motion.div
            initial={enableMotion ? { opacity: 0, y: 12 } : false}
            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              eyebrow="Interactive Mental Model"
              id="tradeoffs-heading"
              title="The Product Tradeoff Engine"
              className="max-w-4xl"
            />
            <p className="mt-5 max-w-3xl text-pretty font-serif text-xl leading-[1.55] tracking-tight text-foreground sm:mt-6 sm:text-2xl sm:leading-[1.5]">
              Great software products aren&apos;t built by eliminating
              tradeoffs. They&apos;re built by navigating them.
            </p>

            <div className="mt-7 max-w-[40rem] space-y-4 text-pretty text-base leading-[1.7] text-muted sm:mt-8 sm:space-y-5 sm:text-[1.05rem] sm:leading-[1.75]">
              <p>
                Every leadership decision changes something else. Increasing
                delivery speed may reduce quality. Growing a team may increase
                capacity while slowing decisions. Investing in innovation may
                reduce predictability.
              </p>
              <p>
                Experienced product leaders learn that every optimization
                creates a new constraint. This interactive mental model explores
                those relationships—not to provide answers, but to encourage
                better questions.
              </p>
            </div>

            <aside className="mt-8 max-w-2xl border-l-2 border-border pl-5 sm:mt-9 sm:pl-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                A note on perspective
              </p>
              <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted/85">
                <p>Every organization is different.</p>
                <p>
                  The relationships shown here are based on my experience
                  leading software products and product organizations over
                  nearly three decades. You may disagree with individual
                  relationships—and that&apos;s part of the point. The value
                  isn&apos;t finding the &ldquo;correct&rdquo; answer. It&apos;s
                  exploring how changing one decision influences another.
                </p>
              </div>
            </aside>
          </motion.div>

          <div className="mt-10 rounded-3xl border border-accent/20 bg-background-elevated p-5 shadow-soft sm:mt-12 sm:p-7 lg:p-8">
            <div className="space-y-6 sm:space-y-7">
              <div>
                <h3 className="max-w-3xl text-pretty font-serif text-xl tracking-tight text-foreground sm:text-[1.35rem] sm:leading-snug">
                  What kind of leadership problem are you trying to solve?
                </h3>
                <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-[0.95rem] sm:leading-relaxed">
                  Select the challenge that best reflects your organization.
                  We&apos;ll adapt the guidance to help you balance customer
                  outcomes, coordination, and decision-making.
                </p>
                <div
                  className="mt-5 flex flex-wrap gap-2"
                  role="group"
                  aria-label="Leadership challenges"
                >
                  {PRESETS.map((preset) => {
                    const selected = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset.id)}
                        title={preset.blurb}
                        data-selected={selected}
                        className="preset-chip rounded-full border px-3.5 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        style={
                          {
                            "--preset-tint": PRESET_TINT_VAR[preset.tint],
                          } as CSSProperties
                        }
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {activePresetMeta ? (
                    <motion.div
                      key={activePresetMeta.id}
                      initial={enableMotion ? { opacity: 0, y: 6 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      exit={enableMotion ? { opacity: 0, y: -4 } : undefined}
                      transition={{ duration: 0.28 }}
                      className="mt-5 max-w-3xl border-l-2 border-accent/35 pl-4 sm:pl-5"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {activePresetMeta.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {activePresetMeta.explanation}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="custom"
                      initial={enableMotion ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={enableMotion ? { opacity: 0 } : undefined}
                      className="mt-5 text-sm leading-relaxed text-muted/75"
                    >
                      Adjust the decisions below — or start from a challenge
                      that reflects the problem you&apos;re facing.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-accent/30 bg-[color-mix(in_srgb,var(--background)_35%,var(--background-elevated))] p-6 sm:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                      Leadership decisions
                    </p>

                    <div className="mt-7 space-y-2">
                      {SLIDER_DEFINITIONS.map((slider) => {
                        const isActive = activeSliderId === slider.id;
                        return (
                          <div
                            key={slider.id}
                            data-active={isActive}
                            className="tradeoff-decision rounded-xl px-3 py-4 transition-[background-color,opacity] duration-300 sm:px-4"
                          >
                            <div className="flex items-end justify-between gap-4">
                              <label
                                htmlFor={`engine-${slider.id}`}
                                className="text-sm font-medium text-foreground"
                              >
                                {slider.label}
                              </label>
                              <span className="text-xs tabular-nums text-muted">
                                {slider.left}
                                {" · "}
                                {slider.right}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-muted/80">
                              {slider.represents}
                            </p>
                            <input
                              id={`engine-${slider.id}`}
                              type="range"
                              min={0}
                              max={100}
                              step={1}
                              value={inputs[slider.id]}
                              onChange={(event) =>
                                updateSlider(
                                  slider.id,
                                  Number(event.target.value),
                                )
                              }
                              onFocus={() => setActiveSliderId(slider.id)}
                              className="tradeoff-slider mt-3 w-full"
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={Math.round(inputs[slider.id])}
                              aria-valuetext={`${slider.left} to ${slider.right}: ${Math.round(inputs[slider.id])}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-background/40 p-5 sm:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      Understanding {activeSlider.label}
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlider.id}
                        initial={enableMotion ? { opacity: 0, y: 4 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={enableMotion ? { opacity: 0, y: -3 } : undefined}
                        transition={{ duration: 0.25 }}
                        className="mt-4 space-y-5"
                      >
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted/80">
                            Why leaders increase it
                          </p>
                          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
                            {activeSlider.context.whyLeadersIncrease.map(
                              (item) => (
                                <li key={item} className="flex gap-2">
                                  <span
                                    aria-hidden
                                    className="mt-2 size-1 shrink-0 rounded-full bg-accent/70"
                                  />
                                  <span>{item}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted/80">
                            What often changes
                          </p>
                          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
                            {activeSlider.context.whatOftenChanges.map(
                              (item) => (
                                <li key={item} className="flex gap-2">
                                  <span
                                    aria-hidden
                                    className="mt-2 size-1 shrink-0 rounded-full bg-signal-caution"
                                  />
                                  <span>{item}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                        <div className="border-t border-border/70 pt-5">
                          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted/80">
                            Leadership question
                          </p>
                          <p className="mt-3 text-pretty font-serif text-lg leading-[1.55] tracking-tight text-foreground sm:text-xl sm:leading-[1.5]">
                            {activeSlider.context.leadershipQuestion}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPrinciplesOpen(true)}
                    className="group inline-flex items-center gap-2 px-1 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    View the principles behind the model
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </button>
                </div>

                <div className="space-y-4" aria-live="polite">
                  <ReflectionPanel
                    label="Potential Benefits"
                    tone="calm"
                    items={reflection.benefits}
                    enableMotion={enableMotion}
                  />
                  <ReflectionPanel
                    label="Potential Costs"
                    tone="stress"
                    items={reflection.costs}
                    enableMotion={enableMotion}
                  />
                  <ReflectionPanel
                    label="Organizational Effects"
                    tone="uncertain"
                    items={reflection.organizationalEffects}
                    enableMotion={enableMotion}
                  />

                  <div className="rounded-2xl border border-border/80 bg-background/40 px-5 py-6 sm:px-6 sm:py-7">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      Questions to Consider
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={reflection.question}
                        initial={enableMotion ? { opacity: 0, y: 4 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={enableMotion ? { opacity: 0, y: -3 } : undefined}
                        transition={{ duration: 0.28 }}
                        className="mt-4 text-pretty font-serif text-lg leading-[1.55] tracking-tight text-foreground sm:mt-5 sm:text-xl sm:leading-[1.5]"
                      >
                        {reflection.question}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 max-w-3xl sm:mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Related essays
            </p>
            <ul className="mt-6 space-y-8 sm:mt-7 sm:space-y-9">
              <li>
                <a
                  href="#beyond-safe"
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <h3 className="font-serif text-xl tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-[1.35rem]">
                    When SAFe Stops Scaling
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    How coordination gradually became more expensive than the
                    value it created.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent">
                    Read Essay
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#product-operating-model"
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <h3 className="font-serif text-xl tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-[1.35rem]">
                    The product operating model actually works
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    Why empowered teams change the way organizations make
                    decisions.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent">
                    Read Essay
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={principlesTitleId}
        className="fixed left-1/2 top-1/2 z-[80] m-0 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background-elevated p-0 text-foreground shadow-hover backdrop:bg-foreground/25 open:flex open:flex-col"
        onClose={() => setPrinciplesOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setPrinciplesOpen(false);
        }}
      >
        <div className="max-h-[min(70vh,36rem)] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                Supporting ideas
              </p>
              <h3
                id={principlesTitleId}
                className="mt-2 font-serif text-2xl tracking-tight text-foreground"
              >
                Principles behind the model
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setPrinciplesOpen(false)}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Close
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            These are mental models, not laws. They explain the tensions this
            experience tries to make visible — not a formula for the right
            answer.
          </p>

          <ul className="mt-8 space-y-6">
            {PRINCIPLES.map((principle) => {
              const tint = PRINCIPLE_TINT_VAR[principle.tint];
              return (
                <li key={principle.id} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: tint }}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {principle.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{principle.summary}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted/90">
                      {principle.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </dialog>
    </section>
  );
}

function ReflectionPanel({
  label,
  tone,
  items,
  enableMotion,
}: {
  label: string;
  tone: "calm" | "stress" | "uncertain";
  items: string[];
  enableMotion: boolean;
}) {
  const toneClass =
    tone === "calm"
      ? "text-signal-calm"
      : tone === "stress"
        ? "text-signal-stress"
        : "text-signal-uncertain";

  return (
    <div className="rounded-2xl border border-border bg-[color-mix(in_srgb,var(--background)_35%,var(--background-elevated))] p-5 sm:p-6">
      <p
        className={`text-[0.7rem] font-medium uppercase tracking-[0.14em] ${toneClass}`}
      >
        {label}
      </p>
      <ul className="mt-3.5 space-y-2.5">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.li
              key={item}
              layout={enableMotion}
              initial={enableMotion ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={enableMotion ? { opacity: 0 } : undefined}
              transition={{ duration: 0.22 }}
              className="flex gap-2.5 text-sm leading-relaxed text-foreground"
            >
              <span
                aria-hidden
                className={`mt-2 size-1 shrink-0 rounded-full ${
                  tone === "calm"
                    ? "bg-signal-calm"
                    : tone === "stress"
                      ? "bg-signal-stress"
                      : "bg-signal-uncertain"
                }`}
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
