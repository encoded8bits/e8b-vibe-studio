/**
 * Cross-component bridge: dispatch sparkle bursts that Cursor listens for.
 * Keeps InvokeRitual (sound) decoupled from Cursor (canvas particles).
 */

export const SPARKLE_BURST_EVENT = "e8b-sparkle-burst" as const;

export type SparkleBurstDetail = {
  /** Viewport X; defaults to horizontal center */
  x?: number;
  /** Viewport Y; defaults to vertical center */
  y?: number;
  /** Strong multi-wave burst (e.g. ritual completion + SFX) */
  intense?: boolean;
};

export function dispatchSparkleBurst(detail: SparkleBurstDetail = {}) {
  if (typeof window === "undefined") return;

  const x = detail.x ?? window.innerWidth / 2;
  const y = detail.y ?? window.innerHeight / 2;

  window.dispatchEvent(
    new CustomEvent(SPARKLE_BURST_EVENT, {
      detail: { ...detail, x, y } satisfies SparkleBurstDetail,
    })
  );
}
