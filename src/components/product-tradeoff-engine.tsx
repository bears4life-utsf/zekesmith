"use client";

import {
  startTransition,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DEFAULT_INPUTS,
  PRESETS,
  SCENARIO_QUERY_PARAM,
  SLIDER_DEFINITIONS,
  computeOutputs,
  getPresetBySlug,
  getReflection,
  getSliderContext,
  getTradeoffDecisionSummary,
  type PresetId,
  type SliderId,
  type SliderInputs,
} from "@/lib/productTradeoffEngine";
import { ContinueExploring } from "@/components/continue-exploring";
import { SectionHeading } from "@/components/section-heading";
import { useEnableMotion } from "@/lib/motion";

/** Calm crossfade when the selected challenge reframes content below. */
const CHALLENGE_FADE = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

function readChallengeInputsFromUrl(): SliderInputs | null {
  if (typeof window === "undefined") return null;
  const slug = new URLSearchParams(window.location.search).get(
    SCENARIO_QUERY_PARAM,
  );
  if (!slug) return null;
  return getPresetBySlug(slug)?.inputs ?? null;
}

function syncChallengeToUrl(presetId: PresetId | null) {
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

function readChallengeIdFromUrl(): PresetId | null {
  if (typeof window === "undefined") return null;
  const slug = new URLSearchParams(window.location.search).get(
    SCENARIO_QUERY_PARAM,
  );
  if (!slug) return null;
  return getPresetBySlug(slug)?.id ?? null;
}

export function ProductTradeoffEngine() {
  const enableMotion = useEnableMotion();

  const [inputs, setInputs] = useState<SliderInputs>(DEFAULT_INPUTS);
  const [selectedChallengeId, setSelectedChallengeId] =
    useState<PresetId | null>(null);
  const [urlHydrated, setUrlHydrated] = useState(false);
  const [activeSliderId, setActiveSliderId] =
    useState<SliderId>("deliverySpeed");

  const outputs = useMemo(() => computeOutputs(inputs), [inputs]);
  const reflection = useMemo(
    () => getReflection(inputs, outputs, selectedChallengeId),
    [inputs, outputs, selectedChallengeId],
  );
  const selectedChallenge = useMemo(
    () =>
      selectedChallengeId
        ? (PRESETS.find((preset) => preset.id === selectedChallengeId) ?? null)
        : null,
    [selectedChallengeId],
  );
  const activeSlider = useMemo(
    () =>
      SLIDER_DEFINITIONS.find((slider) => slider.id === activeSliderId) ??
      SLIDER_DEFINITIONS[0],
    [activeSliderId],
  );
  const activeSliderContext = useMemo(
    () => getSliderContext(activeSlider.id, selectedChallengeId),
    [activeSlider.id, selectedChallengeId],
  );
  const tradeoffDecisionSummary = useMemo(
    () => getTradeoffDecisionSummary(selectedChallenge, inputs),
    [selectedChallenge, inputs],
  );

  useEffect(() => {
    const fromUrl = readChallengeInputsFromUrl();
    const challengeId = readChallengeIdFromUrl();
    startTransition(() => {
      if (fromUrl) setInputs(fromUrl);
      if (challengeId) setSelectedChallengeId(challengeId);
      setUrlHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!urlHydrated) return;
    syncChallengeToUrl(selectedChallengeId);
  }, [selectedChallengeId, urlHydrated]);

  useEffect(() => {
    function onPopState() {
      const fromUrl = readChallengeInputsFromUrl();
      const challengeId = readChallengeIdFromUrl();
      startTransition(() => {
        if (fromUrl) setInputs(fromUrl);
        setSelectedChallengeId(challengeId);
      });
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function updateSlider(id: SliderId, value: number) {
    setActiveSliderId(id);
    setInputs((prev) => {
      if (prev[id] === value) return prev;
      return { ...prev, [id]: value };
    });
  }

  function handleSliderValue(
    id: SliderId,
    raw: string | number,
  ) {
    updateSlider(id, Number(raw));
  }

  function applyPreset(id: PresetId) {
    const preset = PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setSelectedChallengeId(id);
    setInputs(preset.inputs);
  }

  return (
    <section
      id="tradeoffs"
      aria-labelledby="tradeoffs-heading"
      className="relative scroll-mt-24"
    >
      <div className="border-b border-t border-border bg-[color-mix(in_srgb,var(--background-elevated)_62%,var(--background))]">
        <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
          <motion.div
            initial={enableMotion ? { opacity: 1, y: 12 } : false}
            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              eyebrow="Interactive Mental Model"
              id="tradeoffs-heading"
              title="The Product Tradeoff Model"
              className="max-w-4xl"
            />
            <p className="mt-5 max-w-3xl text-pretty font-serif text-xl leading-[1.55] tracking-tight text-foreground sm:mt-6 sm:text-2xl sm:leading-[1.5]">
              Great software products aren&apos;t built by eliminating
              tradeoffs. They&apos;re built by navigating them.
            </p>

            <div className="mt-6 max-w-[40rem] space-y-3.5 text-pretty text-base leading-[1.7] text-muted sm:mt-7 sm:space-y-4 sm:text-[1.05rem] sm:leading-[1.75]">
              <p>
                Every leadership decision changes something else. Increasing
                delivery speed may reduce quality. Growing a team may increase
                capacity while slowing decisions. Investing in innovation may
                reduce predictability.
              </p>
              <p>
                This interactive model explores those relationships—not to
                provide answers, but to encourage better questions.
              </p>
            </div>

            <aside className="mt-6 max-w-2xl border-l-2 border-border pl-5 sm:mt-7 sm:pl-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                A note on perspective
              </p>
              <div className="mt-2.5 space-y-2 text-sm leading-relaxed text-muted/85">
                <p>
                  Every organization is different. These relationships reflect
                  my experience leading software products and product
                  organizations over nearly three decades.
                </p>
                <p>
                  There isn&apos;t a single &ldquo;correct&rdquo; answer. The
                  value comes from understanding how one leadership decision
                  influences another.
                </p>
              </div>
            </aside>
          </motion.div>

          <div className="mt-10 rounded-3xl border border-accent/20 bg-background-elevated px-5 pb-6 pt-7 shadow-soft sm:mt-12 sm:px-8 sm:pb-7 sm:pt-9 lg:px-10 lg:pb-8 lg:pt-10">
            <div className="flex flex-col">
              {/* 1 — Choose */}
              <div>
                <h3 className="max-w-3xl text-pretty font-serif text-[1.375rem] tracking-tight text-foreground sm:text-[1.5rem] sm:leading-snug">
                  What kind of leadership problem are you trying to solve?
                </h3>
                <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-[0.95rem] sm:leading-relaxed">
                  Select the challenge that best reflects your organization. Then
                  adjust the decisions below to see how the tradeoffs change.
                </p>
                <div
                  className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5"
                  role="group"
                  aria-label="Leadership challenges"
                >
                  {PRESETS.map((preset) => {
                    const selected = selectedChallengeId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset.id)}
                        title={preset.blurb}
                        aria-pressed={selected}
                        data-selected={selected}
                        className="preset-chip min-h-10 rounded-full border px-3.5 py-2 text-[0.8125rem] leading-snug sm:px-4 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Challenge → insight → Decisions (hero) → Tradeoffs → Reflect */}
              <div
                className="challenge-lens mt-7 sm:mt-8"
                data-active={selectedChallenge ? "true" : "false"}
              >
                <AnimatePresence mode="wait">
                  {selectedChallenge ? (
                    <motion.div
                      key={selectedChallenge.id}
                      initial={enableMotion ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={enableMotion ? { opacity: 0 } : undefined}
                      transition={CHALLENGE_FADE}
                      className="max-w-3xl"
                    >
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                        Current Leadership Challenge
                      </p>
                      <p className="mt-2.5 font-serif text-lg tracking-tight text-foreground sm:text-xl sm:leading-snug">
                        {selectedChallenge.label}
                      </p>
                      <div className="mt-3 space-y-2.5 text-sm leading-[1.65] text-muted sm:mt-3.5 sm:text-[0.95rem] sm:leading-[1.7]">
                        {selectedChallenge.explanation
                          .split(/\n\n+/)
                          .map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                      </div>
                      <p className="mt-4 text-pretty text-sm font-medium leading-[1.7] tracking-tight text-accent/85 sm:mt-5 sm:text-[0.95rem] sm:leading-[1.75]">
                        {selectedChallenge.guidance.lens}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="custom"
                      initial={enableMotion ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={enableMotion ? { opacity: 0 } : undefined}
                      transition={CHALLENGE_FADE}
                      className="max-w-2xl text-sm leading-relaxed text-muted/75"
                    >
                      Adjust the decisions below — or start from a challenge that
                      reflects the problem you&apos;re facing.
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Pause before the interaction hero — tightened so sliders arrive sooner */}
                <div className="mt-8 border-t border-border/40 pt-8 sm:mt-9 sm:pt-9">
                  {/* Decisions + Understanding (left) · Tradeoffs + Questions to Explore (right) */}
                  <div className="grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.9fr)] lg:gap-x-10 lg:gap-y-12 lg:items-start">
                    <div className="min-w-0">
                      <p className="text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-accent sm:text-sm sm:tracking-[0.17em]">
                        Leadership decisions
                      </p>
                      <div className="mt-8 space-y-2.5 sm:mt-9 sm:space-y-3">
                        {SLIDER_DEFINITIONS.map((slider) => {
                          const isActive = activeSliderId === slider.id;
                          return (
                            <div
                              key={slider.id}
                              data-active={isActive}
                              className="tradeoff-decision rounded-xl px-3 py-5 transition-[background-color,opacity] duration-300 sm:px-4 sm:py-5"
                            >
                              <div className="flex items-end justify-between gap-4">
                                <label
                                  htmlFor={`engine-${slider.id}`}
                                  className="text-[0.9375rem] font-medium text-foreground sm:text-base"
                                >
                                  {slider.label}
                                </label>
                                <span className="text-xs tabular-nums text-muted">
                                  {slider.left}
                                  {" · "}
                                  {slider.right}
                                </span>
                              </div>
                              <p className="mt-1.5 text-xs leading-relaxed text-muted/80">
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
                                  handleSliderValue(
                                    slider.id,
                                    event.target.value,
                                  )
                                }
                                onInput={(event) =>
                                  handleSliderValue(
                                    slider.id,
                                    (event.target as HTMLInputElement).value,
                                  )
                                }
                                onPointerDown={() =>
                                  setActiveSliderId(slider.id)
                                }
                                onFocus={() => setActiveSliderId(slider.id)}
                                className="tradeoff-slider mt-3.5 w-full"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.round(inputs[slider.id])}
                                aria-valuetext={`${slider.left} to ${slider.right}: ${Math.round(inputs[slider.id])}`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Interpretation — teaching the selected decision */}
                      <div className="mt-10 border-t border-border/35 pt-8 sm:mt-12 sm:pt-9">
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
                          Understanding {activeSlider.label}
                        </p>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${selectedChallengeId ?? "none"}-${activeSlider.id}`}
                            initial={enableMotion ? { opacity: 0 } : false}
                            animate={{ opacity: 1 }}
                            exit={enableMotion ? { opacity: 0 } : undefined}
                            transition={CHALLENGE_FADE}
                            className="mt-5 space-y-6 sm:mt-6"
                          >
                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted/70">
                                Why leaders increase it
                              </p>
                              <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-muted">
                                {activeSliderContext.whyLeadersIncrease.map(
                                  (item) => (
                                    <li key={item} className="flex gap-2">
                                      <span
                                        aria-hidden
                                        className="mt-2 size-1 shrink-0 rounded-full bg-accent/55"
                                      />
                                      <span>{item}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted/70">
                                What often changes
                              </p>
                              <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-muted">
                                {activeSliderContext.whatOftenChanges.map(
                                  (item) => (
                                    <li key={item} className="flex gap-2">
                                      <span
                                        aria-hidden
                                        className="mt-2 size-1 shrink-0 rounded-full bg-signal-caution/80"
                                      />
                                      <span>{item}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div
                      className="min-w-0 lg:border-l lg:border-accent/30 lg:pl-9 lg:pt-1 lg:opacity-[0.92]"
                      aria-live="polite"
                    >
                      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted/75">
                        Tradeoffs
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={tradeoffDecisionSummary}
                          initial={enableMotion ? { opacity: 0 } : false}
                          animate={{ opacity: 1 }}
                          exit={enableMotion ? { opacity: 0 } : undefined}
                          transition={CHALLENGE_FADE}
                          className="mt-3 max-w-sm text-pretty text-[0.8125rem] leading-relaxed text-muted/80 sm:mt-3.5"
                        >
                          {tradeoffDecisionSummary}
                        </motion.p>
                      </AnimatePresence>
                      <div className="mt-5 space-y-6 sm:mt-6 sm:space-y-7">
                        <TradeoffSubsection
                          label="Potential Benefits"
                          tone="calm"
                          items={reflection.benefits}
                          enableMotion={enableMotion}
                          revisionKey={selectedChallengeId ?? "none"}
                        />
                        <TradeoffSubsection
                          label="Potential Costs"
                          tone="stress"
                          items={reflection.costs}
                          enableMotion={enableMotion}
                          revisionKey={selectedChallengeId ?? "none"}
                        />
                        <TradeoffSubsection
                          label="Organizational Effects"
                          tone="uncertain"
                          items={reflection.organizationalEffects}
                          enableMotion={enableMotion}
                          revisionKey={selectedChallengeId ?? "none"}
                        />
                      </div>

                      <div className="mt-8 sm:mt-9">
                        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted/80">
                          Questions to Explore
                        </p>
                        <div className="mt-3 space-y-5 sm:mt-4 sm:space-y-6">
                          <AnimatePresence mode="wait">
                            <motion.blockquote
                              key={`${selectedChallengeId ?? "none"}-${activeSlider.id}-leadership`}
                              initial={enableMotion ? { opacity: 0 } : false}
                              animate={{ opacity: 1 }}
                              exit={enableMotion ? { opacity: 0 } : undefined}
                              transition={CHALLENGE_FADE}
                              className="max-w-xl text-pretty font-serif text-lg leading-[1.55] tracking-tight text-foreground sm:text-[1.35rem] sm:leading-[1.5]"
                            >
                              {activeSliderContext.leadershipQuestion}
                            </motion.blockquote>
                          </AnimatePresence>
                          <AnimatePresence mode="wait">
                            <motion.blockquote
                              key={`${selectedChallengeId ?? "none"}-${reflection.question}`}
                              initial={enableMotion ? { opacity: 0 } : false}
                              animate={{ opacity: 1 }}
                              exit={enableMotion ? { opacity: 0 } : undefined}
                              transition={CHALLENGE_FADE}
                              className="max-w-xl text-pretty font-serif text-lg leading-[1.55] tracking-tight text-foreground sm:text-[1.35rem] sm:leading-[1.5]"
                            >
                              {reflection.question}
                            </motion.blockquote>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ContinueExploring />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One labeled list inside the unified Tradeoffs section — no nested card. */
function TradeoffSubsection({
  label,
  tone,
  items,
  enableMotion,
  revisionKey,
}: {
  label: string;
  tone: "calm" | "stress" | "uncertain";
  items: string[];
  enableMotion: boolean;
  /** Challenge id (or sentinel) so lists crossfade when the lens changes. */
  revisionKey: string;
}) {
  const toneClass =
    tone === "calm"
      ? "text-signal-calm"
      : tone === "stress"
        ? "text-signal-stress"
        : "text-signal-uncertain";

  return (
    <div>
      <p
        className={`text-[0.65rem] font-medium uppercase leading-none tracking-[0.14em] opacity-90 ${toneClass}`}
      >
        {label}
      </p>
      <AnimatePresence mode="wait">
        <motion.ul
          key={revisionKey}
          initial={enableMotion ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={enableMotion ? { opacity: 0 } : undefined}
          transition={CHALLENGE_FADE}
          className="mt-3 space-y-2"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.li
                key={item}
                initial={enableMotion ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={enableMotion ? { opacity: 0 } : undefined}
                transition={{ duration: 0.18 }}
                className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
              >
                <span
                  aria-hidden
                  className={`mt-2 size-1 shrink-0 rounded-full opacity-80 ${
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
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
