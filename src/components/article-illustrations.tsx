/** Editorial abstract heroes for writing cards — shared language with the Tradeoff Model. */

type IllustrationProps = {
  className?: string;
};

export function BeyondSafeIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="safe-wash" x1="0" y1="0" x2="640" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eef2f6" />
          <stop offset="0.55" stopColor="#e4ebf1" />
          <stop offset="1" stopColor="#d8e2ea" />
        </linearGradient>
        <linearGradient id="safe-line" x1="72" y1="180" x2="568" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7a92a8" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="#4a6d8c" stopOpacity="0.85" />
          <stop offset="1" stopColor="#7a92a8" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="safe-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(320 168) rotate(90) scale(140 220)">
          <stop stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="360" fill="url(#safe-wash)" />
      <rect width="640" height="360" fill="url(#safe-glow)" />

      {/* Soft horizon rules — roadmap lanes */}
      <path d="M48 118 H592" stroke="#4a6d8c" strokeOpacity="0.1" strokeWidth="1" />
      <path d="M48 180 H592" stroke="#4a6d8c" strokeOpacity="0.14" strokeWidth="1" />
      <path d="M48 242 H592" stroke="#4a6d8c" strokeOpacity="0.1" strokeWidth="1" />

      {/* Delivery flow spine */}
      <path
        d="M72 210 C150 210 170 132 250 132 C330 132 350 228 430 228 C510 228 530 150 568 150"
        stroke="url(#safe-line)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M88 246 C160 246 185 168 265 168 C345 168 360 258 445 258 C515 258 540 198 560 198"
        stroke="#6b849c"
        strokeOpacity="0.35"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="3 7"
      />

      {/* Planning nodes */}
      <g stroke="#4a6d8c" strokeWidth="1.25">
        <circle cx="120" cy="210" r="7" fill="#f7f9fb" strokeOpacity="0.55" />
        <circle cx="250" cy="132" r="9" fill="#f4f7fa" strokeOpacity="0.7" />
        <circle cx="430" cy="228" r="8" fill="#f6f8fa" strokeOpacity="0.65" />
        <circle cx="540" cy="156" r="6.5" fill="#f8fafb" strokeOpacity="0.5" />
      </g>

      {/* Connected secondary nodes */}
      <g fill="#4a6d8c" fillOpacity="0.22">
        <circle cx="188" cy="168" r="3.5" />
        <circle cx="338" cy="188" r="3" />
        <circle cx="486" cy="206" r="3.5" />
      </g>

      {/* Vertical milestone ticks */}
      <g stroke="#4a6d8c" strokeOpacity="0.18" strokeWidth="1">
        <path d="M188 96 V264" />
        <path d="M338 96 V264" />
        <path d="M486 96 V264" />
      </g>

      {/* Small planning diamonds */}
      <g fill="none" stroke="#4a6d8c" strokeOpacity="0.45" strokeWidth="1.1">
        <path d="M188 108 L196 116 L188 124 L180 116 Z" />
        <path d="M338 248 L345 255 L338 262 L331 255 Z" />
      </g>
    </svg>
  );
}

export function ProductOperatingModelIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="pom-wash" x1="40" y1="20" x2="600" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eef3ef" />
          <stop offset="0.5" stopColor="#e4ede6" />
          <stop offset="1" stopColor="#d7e4db" />
        </linearGradient>
        <radialGradient id="pom-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(320 180) rotate(90) scale(160 200)">
          <stop stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="360" fill="url(#pom-wash)" />
      <rect width="640" height="360" fill="url(#pom-glow)" />

      {/* Outer feedback orbit */}
      <ellipse
        cx="320"
        cy="180"
        rx="196"
        ry="108"
        stroke="#3d5a4c"
        strokeOpacity="0.16"
        strokeWidth="1.25"
        strokeDasharray="2 8"
      />
      <ellipse
        cx="320"
        cy="180"
        rx="132"
        ry="72"
        stroke="#3a6558"
        strokeOpacity="0.28"
        strokeWidth="1.35"
      />

      {/* Network edges */}
      <g stroke="#3d5a4c" strokeOpacity="0.32" strokeWidth="1.2">
        <path d="M320 108 L402 156" />
        <path d="M402 156 L378 236" />
        <path d="M378 236 L262 236" />
        <path d="M262 236 L238 156" />
        <path d="M238 156 L320 108" />
        <path d="M320 108 L320 180" />
        <path d="M402 156 L320 180" />
        <path d="M262 236 L320 180" />
      </g>

      {/* Soft cross-org bridges */}
      <g stroke="#5a7a6a" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 6">
        <path d="M238 156 C280 210 360 210 402 156" />
        <path d="M262 236 C300 150 340 150 378 236" />
      </g>

      {/* Organization nodes */}
      <g>
        <circle cx="320" cy="180" r="14" fill="#f5faf7" stroke="#3d5a4c" strokeOpacity="0.55" strokeWidth="1.35" />
        <circle cx="320" cy="108" r="9" fill="#f3f8f5" stroke="#3d5a4c" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="402" cy="156" r="8" fill="#f4f9f6" stroke="#3a6558" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="378" cy="236" r="8.5" fill="#f4f9f6" stroke="#3d5a4c" strokeOpacity="0.48" strokeWidth="1.2" />
        <circle cx="262" cy="236" r="8" fill="#f4f9f6" stroke="#3a6558" strokeOpacity="0.48" strokeWidth="1.2" />
        <circle cx="238" cy="156" r="8.5" fill="#f3f8f5" stroke="#3d5a4c" strokeOpacity="0.5" strokeWidth="1.2" />
      </g>

      {/* Feedback loop arrowheads (subtle) */}
      <g fill="#3d5a4c" fillOpacity="0.35">
        <path d="M498 168 L510 180 L498 192 Z" />
        <path d="M142 192 L130 180 L142 168 Z" />
      </g>
      <path
        d="M470 140 C510 160 510 200 470 220"
        stroke="#3d5a4c"
        strokeOpacity="0.28"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M170 220 C130 200 130 160 170 140"
        stroke="#3d5a4c"
        strokeOpacity="0.28"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Satellite micro-nodes */}
      <g fill="#3a6558" fillOpacity="0.28">
        <circle cx="456" cy="118" r="3" />
        <circle cx="470" cy="248" r="2.5" />
        <circle cx="176" cy="112" r="2.5" />
        <circle cx="164" cy="252" r="3" />
      </g>
    </svg>
  );
}

export function ArticleIllustration({
  kind,
  className,
}: {
  kind: "beyond-safe" | "product-operating-model";
  className?: string;
}) {
  if (kind === "beyond-safe") {
    return <BeyondSafeIllustration className={className} />;
  }
  return <ProductOperatingModelIllustration className={className} />;
}
