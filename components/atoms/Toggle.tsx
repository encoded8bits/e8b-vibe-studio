"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export const Toggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative cursor-pointer flex items-center justify-center p-2 rounded-lg border border-border-subtle bg-surface-primary hover:border-accent/50 transition-all duration-300 group overflow-hidden shadow-sm"
      aria-label="Toggle Theme"
    >
      {/* Glow Effect dinámico usando el token accent */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: isDark ? 45 : -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: isDark ? -45 : 45 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="relative z-10 text-accent"
        >
          {isDark ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};