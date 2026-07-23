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
  COST_DEFINITIONS,
  DEFAULT_INPUTS,
  OUTCOME_DEFINITIONS,
  PRESETS,
  PRESET_TINT_VAR,
  PRINCIPLES,
  PRINCIPLE_TINT_VAR,
  SLIDER_DEFINITIONS,
  categorySignal,
  computeOutputs,
  getCurrentTension,
  matchPreset,
  type OutputDefinition,
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

const SIGNAL_FILL: Record<string, string> = {
  calm: "bg-signal-calm",
  caution: "bg-signal-caution",
  stress: "bg-signal-stress",
  uncertain: "bg-signal-uncertain",
  debt: "bg-signal-debt",
  neutral: "bg-muted",
};

function OutputGauge({
  definition,
  value,
  enableMotion,
}: {
  definition: OutputDefinition;
  value: number;
  enableMotion: boolean;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const signal = categorySignal(definition);
  const fillClass = SIGNAL_FILL[signal] ?? "bg-accent";
  const trackSoft = `var(--signal-${signal}-soft, var(--border))`;
  const signalColor = `var(--signal-${signal}, var(--muted))`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="flex items-center gap-2 text-sm text-foreground">
          <span
            aria-hidden
            className="mt-px inline-block size-1.5 shrink-0 rounded-full"
            style={{ background: signalColor }}
          />
          {definition.label}
        </p>
        <p
          className="shrink-0 font-serif text-base tracking-tight"
          style={{ color: signalColor }}
        >
          {definition.format(clamped)}
        </p>
      </div>
      <div
        className="mt-2.5 h-1.5 overflow-hidden rounded-full"
        style={{ background: trackSoft }}
      >
        <motion.div
          className={`h-full rounded-full ${fillClass}`}
          initial={false}
          animate={{ width: `${clamped}%` }}
          transition={
            enableMotion
              ? { type: "spring", stiffness: 120, damping: 22, mass: 0.8 }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  );
}

export function ProductTradeoffEngine() {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  const enableMotion = isClient && reduceMotion !== true;
  const principlesTitleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [inputs, setInputs] = useState<SliderInputs>(DEFAULT_INPUTS);
  const [principlesOpen, setPrinciplesOpen] = useState(false);

  const outputs = useMemo(() => computeOutputs(inputs), [inputs]);
  const tradeoff = useMemo(
    () => getCurrentTension(inputs, outputs),
    [inputs, outputs],
  );
  const activePreset = useMemo(() => matchPreset(inputs), [inputs]);

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
      <div className="border-b border-border bg-[color-mix(in_srgb,var(--background-elevated)_62%,var(--background))]">
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-0 sm:px-8 sm:pb-20 lg:pt-1">
          <motion.div
            initial={enableMotion ? { opacity: 0, y: 12 } : false}
            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              eyebrow="Thought experiment"
              id="tradeoffs-heading"
              title="The Product Tradeoff Engine"
              className="max-w-4xl"
            />
            <div className="mt-6 max-w-[56rem] space-y-3.5 text-pretty text-base leading-[1.7] text-muted sm:mt-7 sm:space-y-4 sm:text-[1.05rem] sm:leading-[1.7]">
              <p>
                Software teams rarely optimize for a single goal. Every product
                decision balances competing forces: speed versus quality,
                innovation versus certainty, customer value versus technical
                complexity.
              </p>
              <p>
                The Product Tradeoff Engine makes those tensions visible.
                Explore the model and see how shifting one constraint reshapes
                the entire system.
              </p>
              <p className="pt-0.5 text-sm italic leading-[1.65] tracking-[0.01em] text-muted/75 sm:text-[0.95rem]">
                Designed for product leaders, founders, engineers, designers,
                and anyone curious about how software decisions ripple through
                teams and products.
              </p>
            </div>
          </motion.div>

          <div className="mt-8 rounded-3xl border border-accent/20 bg-background-elevated p-5 shadow-soft sm:mt-9 sm:p-7 lg:p-8">
            <div className="space-y-5 sm:space-y-6">
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Preset scenarios"
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

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-accent/30 bg-[color-mix(in_srgb,var(--background)_35%,var(--background-elevated))] p-6 sm:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                      Constraints
                    </p>

                    <div className="mt-7 space-y-8">
                      {SLIDER_DEFINITIONS.map((slider) => (
                        <div key={slider.id}>
                          <div className="flex items-end justify-between gap-4">
                            <label
                              htmlFor={`engine-${slider.id}`}
                              className="text-sm font-medium text-foreground"
                            >
                              {slider.label}
                            </label>
                            <span className="font-serif text-lg tabular-nums tracking-tight text-accent">
                              {Math.round(inputs[slider.id])}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted">
                            <span>{slider.left}</span>
                            <span className="text-right">{slider.right}</span>
                          </div>
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
                            className="tradeoff-slider mt-3 w-full"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(inputs[slider.id])}
                            aria-valuetext={`${slider.left} to ${slider.right}: ${Math.round(inputs[slider.id])}`}
                          />
                        </div>
                      ))}
                    </div>
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

                <div className="space-y-4">
                  <div className="rounded-2xl border border-border bg-[color-mix(in_srgb,var(--background)_35%,var(--background-elevated))] p-6 sm:p-8">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-signal-calm">
                      Outcomes
                    </p>
                    <div className="mt-4 space-y-4">
                      {OUTCOME_DEFINITIONS.map((definition) => (
                        <OutputGauge
                          key={definition.id}
                          definition={definition}
                          value={outputs[definition.id]}
                          enableMotion={enableMotion}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-[color-mix(in_srgb,var(--background)_35%,var(--background-elevated))] p-6 sm:p-8">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-signal-stress">
                      Costs
                    </p>
                    <div className="mt-4 space-y-4">
                      {COST_DEFINITIONS.map((definition) => (
                        <OutputGauge
                          key={definition.id}
                          definition={definition}
                          value={outputs[definition.id]}
                          enableMotion={enableMotion}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-background/40 p-5 sm:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      Current tradeoff
                    </p>
                    <div className="mt-3" aria-live="polite">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={tradeoff.id}
                          initial={enableMotion ? { opacity: 0, y: 4 } : false}
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            enableMotion ? { opacity: 0, y: -3 } : undefined
                          }
                          transition={{ duration: 0.28 }}
                          className="text-pretty text-base leading-[1.7] text-foreground"
                        >
                          {tradeoff.text}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted/80">
                      Every product decision creates both value and cost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
            The model is approximate on purpose. These are the mental models it
            encodes.
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
