import type { ReactNode, SVGProps } from "react";

/**
 * Shared monochrome illustration language for Writing essays.
 * Editorial / diagrammatic — not decorative. Stroke weight and geometry
 * are locked so all six read as one family.
 *
 * Benchmarks for the set: Iron Triangle (simplicity) and Brooks’s Law
 * (comparison clarity). Every diagram should teach the insight if the
 * title were covered. Labels only when geometry alone is not enough.
 */
export const essayIllustrationTokens = {
  viewBoxWidth: 240,
  viewBoxHeight: 160,
  /** Primary stroke — identical across the set */
  strokeWidth: 1.5,
  /** Secondary / quieter strokes */
  strokeWidthQuiet: 1.25,
  /** Shared corner radius for rounded rects */
  cornerRadius: 2.5,
  /** Standard node / vertex radius */
  nodeRadius: 4.5,
  /** Slightly larger focal nodes */
  nodeRadiusFocus: 5.5,
  /** Dense-side nodes (comparison diagrams) */
  nodeRadiusDense: 3.75,
  /** Rounded-rect half-size: sparse / dense comparison */
  rectHalf: 7,
  rectHalfDense: 6,
  /** Shared vertical divider for before/after comparisons */
  dividerX: 108,
  dividerY1: 28,
  dividerY2: 132,
  /** Shared baseline for bottom labels (Iron Triangle, AI constraint) */
  labelBaseline: 146,
  /** Canvas inset — generous whitespace */
  padding: 28,
  /** Label typography inside SVG */
  labelSize: 8.5,
  labelLetterSpacing: 0.04,
  /** Opacity for secondary geometry / labels */
  mutedOpacity: 0.42,
  quietOpacity: 0.28,
} as const;

const {
  viewBoxWidth: VW,
  viewBoxHeight: VH,
  strokeWidth: SW,
  strokeWidthQuiet: SWQ,
  cornerRadius: R,
  nodeRadius: NR,
  nodeRadiusFocus: NRF,
  nodeRadiusDense: NRD,
  rectHalf: RH,
  rectHalfDense: RHD,
  dividerX: DX,
  dividerY1: DY1,
  dividerY2: DY2,
  labelBaseline: LBASE,
  mutedOpacity: MUTED,
  quietOpacity: QUIET,
  labelSize: LABEL,
  labelLetterSpacing: TRACK,
} = essayIllustrationTokens;

type IllustrationProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

function IllustrationShell({
  title,
  children,
  className,
  ...props
}: IllustrationProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={["block w-full text-foreground", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

function DiagramLabel({
  x,
  y,
  children,
  anchor = "middle",
  opacity = MUTED,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="currentColor"
      stroke="none"
      opacity={opacity}
      fontSize={LABEL}
      letterSpacing={`${TRACK}em`}
      fontFamily="var(--font-instrument-sans), ui-sans-serif, system-ui, sans-serif"
      style={{ fontWeight: 500 }}
    >
      {children}
    </text>
  );
}

function Node({
  cx,
  cy,
  r = NR,
  filled = false,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r?: number;
  filled?: boolean;
  opacity?: number;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={filled ? "currentColor" : "var(--background)"}
      opacity={opacity}
    />
  );
}

function ArrowHead({
  x,
  y,
  angleDeg,
  size = 5,
}: {
  x: number;
  y: number;
  angleDeg: number;
  size?: number;
}) {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const left = {
    x: x - size * cos + size * 0.55 * sin,
    y: y - size * sin - size * 0.55 * cos,
  };
  const right = {
    x: x - size * cos - size * 0.55 * sin,
    y: y - size * sin + size * 0.55 * cos,
  };
  return (
    <path
      d={`M ${left.x} ${left.y} L ${x} ${y} L ${right.x} ${right.y}`}
      fill="none"
    />
  );
}

function ComparisonDivider() {
  return (
    <line
      x1={DX}
      y1={DY1}
      x2={DX}
      y2={DY2}
      opacity={QUIET}
      strokeWidth={SWQ}
      strokeDasharray="2 4"
    />
  );
}

/**
 * 1 — Competing forces → one decision → consequences.
 * Insight: leadership is convergence into a choice, not balancing pans.
 * Geometry teaches; no label needed once the filled node is focal.
 */
export function ExplainingTradeoffsIllustration(props: IllustrationProps) {
  const perspectives = [
    { x: 52, y: 34 },
    { x: 120, y: 28 },
    { x: 188, y: 34 },
  ];
  const decision = { x: 120, y: 82 };
  const outcomes = [
    { x: 60, y: 132 },
    { x: 180, y: 132 },
  ];

  return (
    <IllustrationShell
      title="Perspectives converge into one decision with tradeoffs"
      {...props}
    >
      {perspectives.map((p, i) => (
        <line
          key={`in-${i}`}
          x1={p.x}
          y1={p.y}
          x2={decision.x}
          y2={decision.y}
          strokeWidth={SWQ}
          opacity={MUTED + 0.2}
        />
      ))}
      <line
        x1={decision.x}
        y1={decision.y}
        x2={outcomes[0].x}
        y2={outcomes[0].y}
      />
      <line
        x1={decision.x}
        y1={decision.y}
        x2={outcomes[1].x}
        y2={outcomes[1].y}
      />
      <ArrowHead
        x={outcomes[0].x}
        y={outcomes[0].y}
        angleDeg={140}
        size={4.5}
      />
      <ArrowHead
        x={outcomes[1].x}
        y={outcomes[1].y}
        angleDeg={40}
        size={4.5}
      />

      {perspectives.map((p, i) => (
        <Node key={`p-${i}`} cx={p.x} cy={p.y} r={NR} />
      ))}
      <Node cx={decision.x} cy={decision.y} r={NRF} filled />
    </IllustrationShell>
  );
}

/** 2 — Scope / Speed / Quality iron triangle. Benchmark: leave simple. */
export function IronTriangleIllustration(props: IllustrationProps) {
  const top = { x: 120, y: 36 };
  const left = { x: 52, y: 128 };
  const right = { x: 188, y: 128 };

  return (
    <IllustrationShell title="Scope, speed, and quality constraints" {...props}>
      <path
        d={`M ${top.x} ${top.y} L ${right.x} ${right.y} L ${left.x} ${left.y} Z`}
      />
      <Node cx={top.x} cy={top.y} r={NR} filled />
      <Node cx={left.x} cy={left.y} r={NR} filled />
      <Node cx={right.x} cy={right.y} r={NR} filled />
      {/* Quiet centroid mark — the decision sits inside the constraint */}
      <circle
        cx={120}
        cy={98}
        r={3}
        fill="none"
        opacity={QUIET}
        strokeWidth={SWQ}
      />
      <DiagramLabel x={top.x} y={22}>
        Scope
      </DiagramLabel>
      <DiagramLabel x={left.x} y={LBASE}>
        Speed
      </DiagramLabel>
      <DiagramLabel x={right.x} y={LBASE}>
        Quality
      </DiagramLabel>
    </IllustrationShell>
  );
}

/** 3 — Small team vs denser communication network. Benchmark. */
export function MorePeopleSlowDeliveryIllustration(props: IllustrationProps) {
  // Optical center ~80 — no bottom labels; geometry alone teaches density.
  const left = [
    { x: 48, y: 56 },
    { x: 72, y: 104 },
    { x: 28, y: 104 },
  ];
  const right = [
    { x: 148, y: 48 },
    { x: 180, y: 48 },
    { x: 208, y: 76 },
    { x: 196, y: 112 },
    { x: 160, y: 120 },
    { x: 136, y: 84 },
  ];

  const leftEdges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];
  const rightEdges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [0, 3],
    [1, 4],
    [2, 5],
    [0, 4],
    [1, 5],
  ];

  return (
    <IllustrationShell
      title="Coordination paths grow faster than headcount"
      {...props}
    >
      {leftEdges.map(([a, b]) => (
        <line
          key={`l-${a}-${b}`}
          x1={left[a].x}
          y1={left[a].y}
          x2={left[b].x}
          y2={left[b].y}
          strokeWidth={SWQ}
        />
      ))}
      {left.map((p, i) => (
        <Node key={`ln-${i}`} cx={p.x} cy={p.y} filled={i === 0} />
      ))}

      <ComparisonDivider />

      {rightEdges.map(([a, b]) => (
        <line
          key={`r-${a}-${b}`}
          x1={right[a].x}
          y1={right[a].y}
          x2={right[b].x}
          y2={right[b].y}
          opacity={0.55}
          strokeWidth={SWQ}
        />
      ))}
      {right.map((p, i) => (
        <Node key={`rn-${i}`} cx={p.x} cy={p.y} r={NRD} filled={i === 0} />
      ))}
    </IllustrationShell>
  );
}

/**
 * 4 — Continuous learning loop.
 * Insight: customer anchors a cycle — sense, act, learn.
 * Clean ellipse + three nodes + one direction cue. No labels.
 */
export function ProductOperatingModelIllustration(props: IllustrationProps) {
  const cx = 120;
  const cy = 80;
  const rx = 52;
  const ry = 44;

  // 12 o’clock, 4 o’clock, 8 o’clock — on the ellipse
  const nodes = [
    { x: cx, y: cy - ry },
    { x: cx + rx * 0.866, y: cy + ry * 0.5 },
    { x: cx - rx * 0.866, y: cy + ry * 0.5 },
  ];

  // Direction on the descending right arc (customer → act)
  const arrowAngle = -28; // deg from +x
  const arrowRad = (arrowAngle * Math.PI) / 180;
  const arrow = {
    x: cx + rx * Math.cos(arrowRad),
    y: cy + ry * Math.sin(arrowRad),
  };
  // Clockwise tangent on the ellipse (SVG y-down)
  const tangentDeg =
    (Math.atan2(ry * Math.cos(arrowRad), -rx * Math.sin(arrowRad)) * 180) /
    Math.PI;

  return (
    <IllustrationShell title="Continuous customer learning loop" {...props}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
      <ArrowHead
        x={arrow.x}
        y={arrow.y}
        angleDeg={tangentDeg}
        size={4.5}
      />

      <Node cx={nodes[0].x} cy={nodes[0].y} r={NR} filled />
      <Node cx={nodes[1].x} cy={nodes[1].y} r={NR} />
      <Node cx={nodes[2].x} cy={nodes[2].y} r={NR} />
    </IllustrationShell>
  );
}

/** 5 — Sparse dependency graph → dense coordination overhead. */
export function SafeStopsScalingIllustration(props: IllustrationProps) {
  // Optical center matches Brooks; density contrast is the whole lesson.
  const sparse = [
    { x: 44, y: 52 },
    { x: 76, y: 52 },
    { x: 60, y: 88 },
    { x: 60, y: 122 },
  ];
  const sparseEdges: [number, number][] = [
    [0, 2],
    [1, 2],
    [2, 3],
  ];

  const dense = [
    { x: 140, y: 48 },
    { x: 172, y: 48 },
    { x: 204, y: 48 },
    { x: 140, y: 84 },
    { x: 172, y: 84 },
    { x: 204, y: 84 },
    { x: 156, y: 120 },
    { x: 188, y: 120 },
  ];
  // Trimmed vs prior — enough entanglement without Lucidchart density
  const denseEdges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 6],
    [4, 7],
    [5, 7],
    [6, 7],
    [0, 4],
  ];

  return (
    <IllustrationShell
      title="Dependency density and coordination overhead"
      {...props}
    >
      {sparseEdges.map(([a, b]) => (
        <line
          key={`s-${a}-${b}`}
          x1={sparse[a].x}
          y1={sparse[a].y}
          x2={sparse[b].x}
          y2={sparse[b].y}
          strokeWidth={SWQ}
        />
      ))}
      {sparse.map((p, i) => (
        <rect
          key={`sr-${i}`}
          x={p.x - RH}
          y={p.y - RH}
          width={RH * 2}
          height={RH * 2}
          rx={R}
          fill={i === 2 ? "currentColor" : "var(--background)"}
        />
      ))}

      <ComparisonDivider />

      {denseEdges.map(([a, b]) => (
        <line
          key={`d-${a}-${b}`}
          x1={dense[a].x}
          y1={dense[a].y}
          x2={dense[b].x}
          y2={dense[b].y}
          opacity={0.5}
          strokeWidth={SWQ}
        />
      ))}
      {dense.map((p, i) => (
        <rect
          key={`dr-${i}`}
          x={p.x - RHD}
          y={p.y - RHD}
          width={RHD * 2}
          height={RHD * 2}
          rx={R}
          fill={i === 4 ? "currentColor" : "var(--background)"}
        />
      ))}
    </IllustrationShell>
  );
}

/**
 * 6 — AI changes how fast you reach the constraint; the constraint stays.
 * Insight: speed of path ≠ dissolving the tradeoff.
 */
export function AiDoesntEliminateTradeoffsIllustration(
  props: IllustrationProps,
) {
  const startY = 52;
  const aiY = 108;
  const wallX = 200;
  const gateTop = 36;
  const gateBottom = 124;

  // Traditional: more waypoints — both paths stop at the wall
  const traditional = [
    { x: 40, y: startY },
    { x: 84, y: startY },
    { x: 128, y: startY },
    { x: 172, y: startY },
  ];
  // AI: compressed hops — arrives sooner, same wall
  const ai = [
    { x: 40, y: aiY },
    { x: 128, y: aiY },
  ];

  return (
    <IllustrationShell
      title="AI shortens the path; the constraint remains"
      {...props}
    >
      <line
        x1={wallX}
        y1={gateTop}
        x2={wallX}
        y2={gateBottom}
        strokeWidth={SW}
      />
      <g opacity={MUTED} strokeWidth={SWQ}>
        <line x1={wallX - 5} y1={gateTop} x2={wallX + 5} y2={gateTop} />
        <line
          x1={wallX - 5}
          y1={gateBottom}
          x2={wallX + 5}
          y2={gateBottom}
        />
      </g>

      {traditional.slice(0, -1).map((p, i) => (
        <line
          key={`t-${i}`}
          x1={p.x}
          y1={p.y}
          x2={traditional[i + 1].x}
          y2={traditional[i + 1].y}
        />
      ))}
      <line
        x1={traditional[traditional.length - 1].x}
        y1={startY}
        x2={wallX}
        y2={startY}
      />
      {traditional.map((p, i) => (
        <Node key={`tn-${i}`} cx={p.x} cy={p.y} filled={i === 0} />
      ))}

      <line x1={ai[0].x} y1={ai[0].y} x2={ai[1].x} y2={ai[1].y} />
      <line x1={ai[1].x} y1={aiY} x2={wallX} y2={aiY} />
      {ai.map((p, i) => (
        <Node key={`an-${i}`} cx={p.x} cy={p.y} filled={i === 0} />
      ))}

      <DiagramLabel x={wallX} y={LBASE}>
        Constraint
      </DiagramLabel>
    </IllustrationShell>
  );
}

export const essayIllustrationsBySlug = {
  "the-art-of-explaining-tradeoffs": ExplainingTradeoffsIllustration,
  "the-iron-triangle-still-wins": IronTriangleIllustration,
  "why-more-people-often-slow-delivery": MorePeopleSlowDeliveryIllustration,
  "the-product-operating-model-actually-works":
    ProductOperatingModelIllustration,
  "when-safe-stops-scaling": SafeStopsScalingIllustration,
  "ai-doesnt-eliminate-tradeoffs": AiDoesntEliminateTradeoffsIllustration,
} as const;

export type EssayIllustrationSlug = keyof typeof essayIllustrationsBySlug;

export function EssayIllustration({
  slug,
  ...props
}: IllustrationProps & { slug: EssayIllustrationSlug }) {
  const Component = essayIllustrationsBySlug[slug];
  return <Component {...props} />;
}

export const essayIllustrationEntries: ReadonlyArray<{
  slug: EssayIllustrationSlug;
  title: string;
  concept: string;
}> = [
  {
    slug: "the-art-of-explaining-tradeoffs",
    title: "The Art of Explaining Tradeoffs",
    concept: "Forces → decision → consequences",
  },
  {
    slug: "the-iron-triangle-still-wins",
    title: "The Iron Triangle Still Wins",
    concept: "Scope · Speed · Quality constraints",
  },
  {
    slug: "why-more-people-often-slow-delivery",
    title: "Why More People Often Slow Delivery",
    concept: "Communication paths vs headcount",
  },
  {
    slug: "the-product-operating-model-actually-works",
    title: "The Product Operating Model Actually Works",
    concept: "Continuous customer learning loop",
  },
  {
    slug: "when-safe-stops-scaling",
    title: "When SAFe Stops Scaling",
    concept: "Dependency density and overhead",
  },
  {
    slug: "ai-doesnt-eliminate-tradeoffs",
    title: "AI Doesn’t Eliminate Tradeoffs",
    concept: "Faster path; the constraint remains",
  },
];
