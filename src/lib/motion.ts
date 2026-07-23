"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Gate entrance animations until after hydration.
 * Avoids SSR `opacity: 0` getting stuck when Framer Motion fails to animate
 * (intermittent with Next.js 16 + React 19).
 */
export function useEnableMotion() {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  return isClient && reduceMotion !== true;
}
