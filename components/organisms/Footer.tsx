import React from 'react';
import { Leaf, Github, Twitter, Linkedin, Heart } from 'lucide-react';

/**
 * The e8b-vibe-studio Footer 🌿
 * Minimalist, sophisticated, and built for the DX era.
 */
export const Footer = () => {
  return (
    <footer className="w-full py-20 px-6 border-t border-brand-gold/5 bg-brand-jungle/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* 🌿 Brand Identity Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-brand-gold text-brand-jungle">
              <Leaf size={18} fill="currentColor" />
            </div>
            <span className="font-bold tracking-tighter text-xl text-text-main">
              e8b<span className="text-accent">.</span>studio
            </span>
          </div>
          <p className="text-accent/60 text-sm max-w-xs leading-relaxed">
            Architecting high-fidelity digital experiences through 
            <span className="text-accent font-medium"> Magia Digital</span> and 
            advanced frontend orchestration. 🏛️
          </p>
        </div>

        {/* 🧪 Navigation Molecule */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-main">The Lab</h4>
          <ul className="space-y-2 text-sm text-accent/50 font-light">
            <li className="hover:text-accent cursor-pointer transition-colors">Experiments</li>
            <li className="hover:text-accent cursor-pointer transition-colors">Architecture</li>
            <li className="hover:text-accent cursor-pointer transition-colors">Grimoire</li>
          </ul>
        </div>

        {/* 🪄 Social Connectivity */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-main">Connect</h4>
          <div className="flex gap-5 text-accent/40">
            <Github className="hover:text-accent cursor-pointer transition-all hover:-translate-y-1" size={20} />
            <Twitter className="hover:text-accent cursor-pointer transition-all hover:-translate-y-1" size={20} />
            <Linkedin className="hover:text-accent cursor-pointer transition-all hover:-translate-y-1" size={20} />
          </div>
        </div>
      </div>

      {/* 🏛️ Final Legal/Signature Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-gold/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.3em] uppercase text-accent/20">
        <p>© 2026 Magia Digital Studio • Costa Rica 🇨🇷</p>
        <div className="flex items-center gap-1.5">
          Curated with <Heart size={10} className="text-accent/40" /> for the <span className="text-accent/40">Next.js</span> Era.
        </div>
      </div>
    </footer>
  );
};