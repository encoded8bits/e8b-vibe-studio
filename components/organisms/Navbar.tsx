"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Github, Menu } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text'; // Importamos el átomo ⚛️

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${
        scrolled ? "bg-brand-darker/80 backdrop-blur-xl border-b border-brand-gold/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-lg bg-brand-gold text-brand-jungle transition-transform duration-500 group-hover:rotate-12">
            <Leaf size={20} fill="currentColor" />
          </div>
          <Text variant="h3" className="text-xl">
            e8b<span className="text-brand-gold">.</span>studio
          </Text>
        </div>

        {/* Navigation Molecules (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {['Labs', 'Architecture', 'Grimoire'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="group">
              <Text variant="label" className="text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300">
                {item}
              </Text>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Github className="w-5 h-5 text-brand-gold/40 hover:text-brand-gold cursor-pointer transition-colors" />
          <Button variant="outline" className="py-2 px-5 text-sm">
            Contact 🪶
          </Button>
          <Menu className="md:hidden text-brand-gold" />
        </div>
      </div>
    </motion.nav>
  );
};