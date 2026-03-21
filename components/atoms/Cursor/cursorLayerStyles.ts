import { CURSOR_Z_LAYERS } from "@/lib/cursor/constants";

const BASE_CANVAS = `pointer-events-none fixed inset-0 ${CURSOR_Z_LAYERS.canvas}`;
const BASE_GLOW = `
  pointer-events-none fixed top-0 left-0 ${CURSOR_Z_LAYERS.glow} rounded-full
  mix-blend-plus-lighter will-change-transform
`.trim();
const BASE_DOT = `
  fixed top-0 left-0 ${CURSOR_Z_LAYERS.dot} rounded-full pointer-events-none
  mix-blend-difference will-change-transform
  transition-[width,height,opacity,margin] duration-300 ease-out
`.trim();

export const CURSOR_LAYER_CLASSES = {
  canvas: BASE_CANVAS,
  glow: {
    default: `${BASE_GLOW} h-10 w-10 -ml-5 -mt-5 bg-accent/15 blur-lg`,
    hover: `${BASE_GLOW} h-16 w-16 -ml-8 -mt-8 bg-accent/25 blur-xl`,
  },
  dot: {
    default: `${BASE_DOT} h-4 w-4 -mt-2 -ml-2 bg-text-main opacity-70`,
    hover: `${BASE_DOT} h-10 w-10 -mt-5 -ml-5 bg-accent opacity-90`,
  },
} as const;
