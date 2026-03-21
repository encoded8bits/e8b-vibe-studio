/**
 * Cursor / sparkle engine configuration (single source of truth).
 */

export const CURSOR_BODY_CLASS_HIDE_SYSTEM = "cursor-none-global";

export const CURSOR_INTERACTIVE_SELECTOR =
  'button, a, input, [role="button"], .interactive';

export const CURSOR_MAX_SPARKLES = 120;

export const CURSOR_SPAWN_DISTANCE_PX = 5;

export const CURSOR_PHYSICS = {
  friction: 0.96,
  gravity: 0.02,
  glowLerp: 0.14,
  twinkleDelta: 0.45,
} as const;

/** Tailwind z-index utility classes (static strings for JIT). */
export const CURSOR_Z_LAYERS = {
  canvas: "z-[9997]",
  glow: "z-[9998]",
  dot: "z-[9999]",
} as const;

export const CURSOR_DPR_CAP = 2;
