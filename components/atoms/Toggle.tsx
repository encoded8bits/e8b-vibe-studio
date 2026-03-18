"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export const Toggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Evitamos FOUC (Flash of Unstyled Content)
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative cursor-pointer flex items-center justify-center p-2 rounded-lg border border-brand-gold/20 bg-brand-darker/50 hover:border-brand-gold/60 transition-colors group overflow-hidden"
      aria-label="Toggle Theme"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

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