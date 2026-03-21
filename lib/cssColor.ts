/**
 * Canvas-safe color helpers (theme tokens are often hex strings).
 */

const FALLBACK_ACCENT_HEX = "#e2b05e";

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(226,176,94,${alpha})`;
}

export function readAccentColorFromDocument(): string {
  if (typeof document === "undefined") return FALLBACK_ACCENT_HEX;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent")
    .trim();
  return raw || FALLBACK_ACCENT_HEX;
}
