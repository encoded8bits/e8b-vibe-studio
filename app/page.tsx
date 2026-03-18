"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/organisms/Navbar";
import { SpellCard } from "@/components/molecules/SpellCard";
import { CodeExperiment } from "@/components/organisms/CodeExperiment"; // New Import! 🪄
import { Wand2, Feather, Leaf } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export default function VibeCheckPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden p-6 pt-32">
      {/* 1. THE HERO SECTION (Your intro) 🏛️ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center space-y-8 mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          e8b-<span className="text-brand-gold font-serif italic">vibe</span>-studio
        </h1>
        <div className="flex justify-center gap-4">
          <Button><Wand2 size={18} /> Invoke Ritual</Button>
          <Button variant="outline"><Feather size={18} /> Explore Lab</Button>
        </div>
      </motion.div>

      {/* 2. THE SPELL CARDS (Your traits/services) 🧪 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-32">
        <SpellCard 
          icon={Leaf} 
          tag="Architecture"
          title="Atomic Systems" 
          description="Scalable Next.js 16 patterns for the modern web." 
        />
        <SpellCard 
            icon={Wand2} 
            tag="Mastery"
            title="Frontend Architecture" 
            description="Scalable Next.js 16 patterns for enterprise-grade applications." 
          />
        <SpellCard 
          icon={Leaf} 
          tag="Design"
          title="Atomic Systems" 
          description="Building robust component libraries with Tailwind v4 and logic-first UI." 
        />
        <SpellCard 
          icon={Feather} 
          tag="Workflow"
          title="Agentic Vibe" 
          description="Optimizing DX through Cursor, Claude, and high-fidelity AI orchestration." 
        />
      </div>

      {/* 3. THE CODE EXPERIMENT (The logic showcase) 🪶 */}
      <CodeExperiment />

      <footer className="py-12 text-brand-gold/30 text-[10px] tracking-[0.3em] uppercase">
        Magia Digital • 2026 🏛️🌿
      </footer>
    </main>
  );
}

