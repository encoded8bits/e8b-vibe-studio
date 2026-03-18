import React from 'react';
import { motion } from 'framer-motion';

export const CardPrimitive = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`group relative p-6 rounded-2xl bg-brand-darker/40 border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 overflow-hidden ${className}`}
  >
    {/* Glow effect Atom-level logic */}
    <div className="absolute inset-0 bg-linear-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);