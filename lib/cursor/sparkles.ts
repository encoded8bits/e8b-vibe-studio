import { hexToRgba, readAccentColorFromDocument } from "@/lib/cssColor";
import {
  CURSOR_DPR_CAP,
  CURSOR_MAX_SPARKLES,
  CURSOR_PHYSICS,
} from "@/lib/cursor/constants";

export type SparkleSpawnTier = "trail" | "burst" | "intense";

export type Sparkle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  spin: number;
  twinklePhase: number;
  variant: "star" | "dot";
};

const TIER_PARAMS: Record<
  SparkleSpawnTier,
  {
    count: () => number;
    spread: number;
    speedMin: number;
    speedRange: number;
    lifeMin: number;
    lifeRange: number;
    lift: number;
    sizeMin: number;
    sizeRange: number;
    spinRange: number;
  }
> = {
  trail: {
    count: () => 2 + Math.floor(Math.random() * 4),
    spread: 8,
    speedMin: 0.3,
    speedRange: 1.2,
    lifeMin: 22,
    lifeRange: 20,
    lift: 0.15,
    sizeMin: 3,
    sizeRange: 6,
    spinRange: 0.35,
  },
  burst: {
    count: () => 10,
    spread: 14,
    speedMin: 1.2,
    speedRange: 2.8,
    lifeMin: 38,
    lifeRange: 28,
    lift: 0.4,
    sizeMin: 5,
    sizeRange: 9,
    spinRange: 0.35,
  },
  intense: {
    count: () => 34,
    spread: 48,
    speedMin: 1.8,
    speedRange: 4.2,
    lifeMin: 48,
    lifeRange: 36,
    lift: 0.55,
    sizeMin: 6,
    sizeRange: 12,
    spinRange: 0.5,
  },
};

export function spawnSparklesIntoPool(
  pool: Sparkle[],
  cx: number,
  cy: number,
  tier: SparkleSpawnTier
): void {
  const p = TIER_PARAMS[tier];
  const n = p.count();
  for (let i = 0; i < n; i++) {
    if (pool.length >= CURSOR_MAX_SPARKLES) pool.shift();
    const angle = Math.random() * Math.PI * 2;
    const speed = p.speedMin + Math.random() * p.speedRange;
    const maxLife = p.lifeMin + Math.random() * p.lifeRange;
    pool.push({
      x: cx + (Math.random() - 0.5) * p.spread,
      y: cy + (Math.random() - 0.5) * p.spread,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - p.lift,
      life: maxLife,
      maxLife,
      size: p.sizeMin + Math.random() * p.sizeRange,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * p.spinRange,
      variant: Math.random() > 0.35 ? "star" : "dot",
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }
}

export function drawSparkle(
  ctx: CanvasRenderingContext2D,
  s: Sparkle,
  accent: string
): void {
  const t = s.life / s.maxLife;
  const alpha = t * t * (0.35 + 0.65 * Math.sin(s.twinklePhase));

  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.rotation);
  ctx.globalAlpha = alpha;

  if (s.variant === "dot") {
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size);
    g.addColorStop(0, hexToRgba(accent, 0.95));
    g.addColorStop(0.4, hexToRgba(accent, 0.45));
    g.addColorStop(1, hexToRgba(accent, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, s.size, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = hexToRgba(accent, 0.9);
    ctx.lineWidth = Math.max(0.8, s.size * 0.12);
    ctx.shadowBlur = s.size * 1.2;
    ctx.shadowColor = accent;
    const r = s.size;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      ctx.rotate(Math.PI / 2);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.restore();
}

export function tickSparkles(
  ctx: CanvasRenderingContext2D,
  pool: Sparkle[],
  viewWidth: number,
  viewHeight: number
): void {
  const accent = readAccentColorFromDocument();
  const { friction, gravity, twinkleDelta } = CURSOR_PHYSICS;

  ctx.clearRect(0, 0, viewWidth, viewHeight);

  for (let i = pool.length - 1; i >= 0; i--) {
    const s = pool[i];
    s.life -= 1;
    s.x += s.vx;
    s.y += s.vy;
    s.vx *= friction;
    s.vy *= friction;
    s.vy -= gravity;
    s.rotation += s.spin;
    s.twinklePhase += twinkleDelta;

    if (s.life <= 0) {
      pool.splice(i, 1);
      continue;
    }
    drawSparkle(ctx, s, accent);
  }
}

export function resizeCursorCanvasToWindow(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): void {
  const dpr = Math.min(window.devicePixelRatio || 1, CURSOR_DPR_CAP);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
