"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Github, Menu } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text'; 
import { Toggle } from '@/components/atoms/Toggle'; 

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // REFACTOR: Usamos surface-secondary con opacidad y border-subtle
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${
        scrolled 
          ? "bg-surface-secondary/80 backdrop-blur-xl border-b border-border-subtle shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-2 group cursor-pointer">
          {/* El logo puede mantener el brand-gold porque es Identidad, no Layout */}
          <div className="p-2 rounded-lg bg-accent text-surface-secondary transition-transform duration-500 group-hover:rotate-12 shadow-sm">
            <Leaf size={20} fill="currentColor" />
          </div>
          <Text variant="h3" className="text-xl tracking-tighter">
            e8b<span className="text-accent">.</span>studio
          </Text>
        </div>

        {/* Navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {['Labs', 'Architecture', 'Grimoire'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="group relative">
              <Text 
                variant="label" 
                // Usamos text-dim para que cambie según el tema
                className="text-text-dim group-hover:text-accent transition-colors duration-300"
              >
                {item}
              </Text>
              {/* Underline animado sutil */}
              <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Github className="w-5 h-5 text-text-dim hover:text-accent cursor-pointer transition-colors" />
          <Toggle />
          <Button variant="outline" className="hidden sm:flex py-2 px-5 text-sm">
            Contact 🪶
          </Button>
          <Menu className="md:hidden text-text-main" />
        </div>
      </div>
    </motion.nav>
  );
};