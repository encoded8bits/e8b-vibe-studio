"use client";

import { useEffect, useState } from "react";

/**
 * Custom cursor is only suitable for fine pointers and when motion is not reduced.
 */
export function useCursorSuitability(): boolean {
  const [isSuitable, setIsSuitable] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsSuitable(isFinePointer && !prefersReducedMotion);
  }, []);

  return isSuitable;
}
