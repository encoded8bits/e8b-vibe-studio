// components/atoms/Cursor.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  SPARKLE_BURST_EVENT,
  type SparkleBurstDetail,
} from "@/lib/sparkleEvents";

const useCursorSuitability = () => {
  const [isSuitable, setIsSuitable] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsSuitable(isFinePointer && !prefersReducedMotion);
  }, []);

  return isSuitable;
};

type Sparkle = {
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

const MAX_SPARKLES = 120;
const SPAWN_DISTANCE = 5;

function readAccentColor(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent")
    .trim();
  return raw || "#e2b05e";
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  s: Sparkle,
  accent: string
) {
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

/** Minimal hex → rgba for canvas (supports #rgb, #rrggbb) */
function hexToRgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  return `rgba(226,176,94,${a})`;
}

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const isSuitable = useCursorSuitability();

  const spawnSparkles = useCallback(
    (cx: number, cy: number, burst: boolean, intense = false) => {
      const pool = sparklesRef.current;
      const count = intense
        ? 34
        : burst
          ? 10
          : 2 + Math.floor(Math.random() * 4);
      const spread = intense ? 48 : burst ? 14 : 8;
      for (let i = 0; i < count; i++) {
        if (pool.length >= MAX_SPARKLES) pool.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = intense
          ? 1.8 + Math.random() * 4.2
          : burst
            ? 1.2 + Math.random() * 2.8
            : 0.3 + Math.random() * 1.2;
        const maxLife = intense
          ? 48 + Math.random() * 36
          : burst
            ? 38 + Math.random() * 28
            : 22 + Math.random() * 20;
        pool.push({
          x: cx + (Math.random() - 0.5) * spread,
          y: cy + (Math.random() - 0.5) * spread,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (intense ? 0.55 : burst ? 0.4 : 0.15),
          life: maxLife,
          maxLife,
          size: intense
            ? 6 + Math.random() * 12
            : burst
              ? 5 + Math.random() * 9
              : 3 + Math.random() * 6,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * (intense ? 0.5 : 0.35),
          variant: Math.random() > 0.35 ? "star" : "dot",
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    },
    []
  );

  useEffect(() => {
    if (!isSuitable) return;

    document.body.classList.add("cursor-none-global");

    let mouseX = 0;
    let mouseY = 0;
    let lastSpawnX = 0;
    let lastSpawnY = 0;
    let glowX = 0;
    let glowY = 0;
    let running = true;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) {
      document.body.classList.remove("cursor-none-global");
      return () => {};
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastSpawnX;
      const dy = mouseY - lastSpawnY;
      const dist = Math.hypot(dx, dy);
      if (dist >= SPAWN_DISTANCE) {
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
        spawnSparkles(mouseX, mouseY, false);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const next =
        !!target.closest(
          "button, a, input, [role=\"button\"], .interactive"
        );
      setIsHovering((prev) => {
        if (!prev && next) {
          spawnSparkles(mouseX, mouseY, true);
        }
        return next;
      });
    };

    let rafId = 0;
    const animate = () => {
      if (!running) return;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const gx = glowRef.current;
      if (gx) {
        glowX += (mouseX - glowX) * 0.14;
        glowY += (mouseY - glowY) * 0.14;
        gx.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }

      const pool = sparklesRef.current;
      const accent = readAccentColor();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = pool.length - 1; i >= 0; i--) {
        const s = pool[i];
        s.life -= 1;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.vy -= 0.02;
        s.rotation += s.spin;
        s.twinklePhase += 0.45;

        if (s.life <= 0) {
          pool.splice(i, 1);
          continue;
        }
        drawSparkle(ctx, s, accent);
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const onSparkleBurst = (e: Event) => {
      const d = (e as CustomEvent<SparkleBurstDetail>).detail;
      if (!d || typeof d.x !== "number" || typeof d.y !== "number") return;
      spawnSparkles(d.x, d.y, true, !!d.intense);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener(SPARKLE_BURST_EVENT, onSparkleBurst);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener(SPARKLE_BURST_EVENT, onSparkleBurst);
      document.body.classList.remove("cursor-none-global");
      sparklesRef.current = [];
    };
  }, [isSuitable, spawnSparkles]);

  if (!isSuitable) return null;

  return createPortal(
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9997]"
      />
      <div
        ref={glowRef}
        className={`
          pointer-events-none fixed top-0 left-0 z-[9998] rounded-full
          mix-blend-plus-lighter will-change-transform
          ${isHovering
            ? "h-16 w-16 -ml-8 -mt-8 bg-accent/25 blur-xl"
            : "h-10 w-10 -ml-5 -mt-5 bg-accent/15 blur-lg"}
        `}
      />
      <div
        ref={cursorRef}
        className={`
          fixed top-0 left-0 z-[9999] rounded-full pointer-events-none
          mix-blend-difference will-change-transform
          ${isHovering
            ? "h-10 w-10 -mt-5 -ml-5 bg-accent opacity-90"
            : "h-4 w-4 -mt-2 -ml-2 bg-text-main opacity-70"}
          transition-[width,height,opacity,margin] duration-300 ease-out
        `}
      />
    </>,
    document.body
  );
};
