"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0 a 100
  className?: string;
  showPercentage?: boolean;
}

/**
 * ProgressBar Atom ⚡
 * Employs semantic tokens for theme-awareness and Framer Motion for polish.
 */
export const ProgressBar = ({ 
  progress, 
  className = "", 
  showPercentage = false 
}: ProgressBarProps) => {
  // Aseguramos que el progreso esté en el rango 0-100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {showPercentage && (
        <div className="flex justify-end">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      
      <div className="h-1.5 w-full bg-border-subtle overflow-hidden rounded-full relative">
        {/* Track Glow (Sutil en modo Dark, casi invisible en Light) */}
        <div className="absolute inset-0 bg-accent/5 blur-sm" />
        
        {/* Progress Fill */}
        <motion.div
          className="h-full bg-accent relative z-10"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 45, 
            damping: 15,
            mass: 0.8 
          }}
        />
      </div>
    </div>
  );
};