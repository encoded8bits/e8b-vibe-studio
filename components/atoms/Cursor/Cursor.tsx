"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useCursorSuitability } from "@/hooks/useCursorSuitability";
import {
  SPARKLE_BURST_EVENT,
  type SparkleBurstDetail,
} from "@/lib/sparkleEvents";
import {
  CURSOR_BODY_CLASS_HIDE_SYSTEM,
  CURSOR_INTERACTIVE_SELECTOR,
  CURSOR_PHYSICS,
  CURSOR_SPAWN_DISTANCE_PX,
} from "@/lib/cursor/constants";
import {
  type Sparkle,
  type SparkleSpawnTier,
  resizeCursorCanvasToWindow,
  spawnSparklesIntoPool,
  tickSparkles,
} from "@/lib/cursor/sparkles";
import { CURSOR_LAYER_CLASSES } from "./cursorLayerStyles";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const isSuitable = useCursorSuitability();

  const spawnAt = useCallback((cx: number, cy: number, tier: SparkleSpawnTier) => {
    spawnSparklesIntoPool(sparklesRef.current, cx, cy, tier);
  }, []);

  useEffect(() => {
    if (!isSuitable) return;

    document.body.classList.add(CURSOR_BODY_CLASS_HIDE_SYSTEM);

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
      document.body.classList.remove(CURSOR_BODY_CLASS_HIDE_SYSTEM);
      return () => {};
    }

    const resize = () => resizeCursorCanvasToWindow(canvas, ctx);
    resize();
    window.addEventListener("resize", resize);

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastSpawnX;
      const dy = mouseY - lastSpawnY;
      if (Math.hypot(dx, dy) >= CURSOR_SPAWN_DISTANCE_PX) {
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
        spawnAt(mouseX, mouseY, "trail");
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const next = !!target.closest(CURSOR_INTERACTIVE_SELECTOR);
      setIsHovering((prev) => {
        if (!prev && next) {
          spawnAt(mouseX, mouseY, "burst");
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
        const { glowLerp } = CURSOR_PHYSICS;
        glowX += (mouseX - glowX) * glowLerp;
        glowY += (mouseY - glowY) * glowLerp;
        gx.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }

      tickSparkles(
        ctx,
        sparklesRef.current,
        window.innerWidth,
        window.innerHeight
      );

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const onSparkleBurst = (e: Event) => {
      const d = (e as CustomEvent<SparkleBurstDetail>).detail;
      if (!d || typeof d.x !== "number" || typeof d.y !== "number") return;
      spawnAt(d.x, d.y, d.intense ? "intense" : "burst");
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
      document.body.classList.remove(CURSOR_BODY_CLASS_HIDE_SYSTEM);
      sparklesRef.current = [];
    };
  }, [isSuitable, spawnAt]);

  if (!isSuitable) return null;

  const glowClass = isHovering
    ? CURSOR_LAYER_CLASSES.glow.hover
    : CURSOR_LAYER_CLASSES.glow.default;
  const dotClass = isHovering
    ? CURSOR_LAYER_CLASSES.dot.hover
    : CURSOR_LAYER_CLASSES.dot.default;

  return createPortal(
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={CURSOR_LAYER_CLASSES.canvas}
      />
      <div ref={glowRef} className={glowClass} />
      <div ref={cursorRef} className={dotClass} />
    </>,
    document.body
  );
}
