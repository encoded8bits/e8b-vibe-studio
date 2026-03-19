import React from 'react';
import { motion } from 'framer-motion';

export const CardPrimitive = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    // Cambiamos bg-brand-darker/40 por surface-primary
    // Cambiamos border-brand-gold/10 por border-border-subtle
    className={`group relative p-6 rounded-2xl bg-surface-primary border border-border-subtle hover:border-accent/40 transition-all duration-500 overflow-hidden ${className}`}
  >
    {/* Glow effect: lo hacemos más sutil en light mode usando el token accent */}
    <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);