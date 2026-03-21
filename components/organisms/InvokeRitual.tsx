"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { RitualData, RitualStep } from '@/types/ritual';
import useSound from "use-sound";

export const InvokeRitual = () => {
  const [step, setStep] = useState<RitualStep>(1);
  const [data, setData] = useState<RitualData>({
    vibe: null,
    intensity: 50,
    sanctuaryName: ''
  });
  const [play] = useSound('/sounds/magic-sparkle.mp3', { volume: 0.5 });
  // Progress value for the ProgressBar atom
  const progress = (step === 'COMPLETE') ? 100 : ((step - 1) / 3) * 100;

  // 1. Advance to next step
  const nextStep = () => {
    setStep((prev): RitualStep => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;
      if (prev === 3) {
        play();
        return 'COMPLETE';
      }
      return prev; // Fallback when already COMPLETE
    });
    
  };

  // 2. Go back one step
  const prevStep = () => {
    setStep((prev): RitualStep => {
      if (prev === 2) return 1;
      if (prev === 3) return 2;
      return prev;
    });
  };

  // 3. Whether the back button is enabled (avoids comparing RitualStep with number)
  const canGoBack = step === 2 || step === 3;

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8 bg-surface-primary border border-border-subtle rounded-3xl shadow-xl">
      {/* Wizard header */}
      <div className="space-y-2">
        <Text variant="label" className="text-accent">Step {step} of 3</Text>
        <Text variant="h3">Vibe Invocation</Text>
        <ProgressBar progress={progress} showPercentage />
      </div>

      {/* Step content area with transition animation */}
      <div className="min-h-[300px] relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Text variant="h3">Choose Your Aesthetic</Text>
                <Text variant="body">The visual essence that will define this lab&apos;s architecture.</Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['minimalist', 'brutalist', 'organic'] as const).map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => setData({ ...data, vibe })}
                    className={`
                      relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group
                      ${data.vibe === vibe 
                        ? 'border-accent bg-accent/5 shadow-[0_0_20px_rgba(146,109,39,0.1)]' 
                        : 'border-border-subtle bg-surface-secondary/30 hover:border-accent/40'}
                    `}
                  >
                    {/* Selection indicator (subtle check) */}
                    <div className={`
                      absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-500
                      ${data.vibe === vibe ? 'bg-accent scale-125' : 'bg-border-subtle scale-100'}
                    `} />

                    <Text variant="label" className={`mb-1 ${data.vibe === vibe ? 'text-accent' : 'text-text-dim'}`}>
                      Vibe
                    </Text>
                    <Text variant="h3" className="capitalize text-lg">
                      {vibe}
                    </Text>
                    
                    <p className="text-[10px] text-text-dim mt-2 leading-tight opacity-70 group-hover:opacity-100">
                      {vibe === 'minimalist' && "Absolute clarity and negative space."}
                      {vibe === 'brutalist' && "Raw structure and bold typography."}
                      {vibe === 'organic' && "Flow, curves, and natural harmony."}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <Text variant="h3">Energy Channeling</Text>
                <Text variant="body">Set the intensity of AI and processing resources for this ritual.</Text>
              </div>

              {/* Slider and visual feedback */}
              <div className="py-10 px-6 bg-surface-secondary/50 rounded-3xl border border-border-subtle space-y-6">
                <div className="flex justify-between items-end">
                  <Text variant="label" className="text-accent">Nexus Power</Text>
                  <span className="text-4xl font-mono font-bold text-text-main tracking-tighter">
                    {data.intensity}<span className="text-accent text-sm ml-1">%</span>
                  </span>
                </div>

                {/* Custom range input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={data.intensity}
                  onChange={(e) => setData({ ...data, intensity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-accent"
                />

                {/* ProgressBar atom as live mirror */}
                <div className="pt-4 border-t border-border-subtle/50">
                  <Text variant="label" className="mb-2 block opacity-50 text-[9px]">Live Preview Monitor</Text>
                  <ProgressBar progress={data.intensity} />
                </div>
              </div>

              <p className="text-[11px] text-text-dim italic opacity-60 text-center">
                Note: Levels above 80% require greater stability in the Sanctuary.
              </p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <Text variant="h3">Sanctuary Baptism</Text>
                <Text variant="body">Name this knowledge nexus to seal the ritual in the Grimoire.</Text>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="e.g. Obsidian-Alpha, Studio-Vibe..."
                    value={data.sanctuaryName}
                    onChange={(e) => setData({ ...data, sanctuaryName: e.target.value })}
                    className={`
                      w-full bg-surface-secondary border-2 p-5 rounded-2xl outline-hidden
                      text-text-main font-mono transition-all duration-300
                      ${data.sanctuaryName.length > 3 
                        ? 'border-accent shadow-[0_0_15px_rgba(146,109,39,0.1)]' 
                        : 'border-border-subtle focus:border-accent/50'}
                    `}
                  />
                  {/* Optional input decoration */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30 text-accent">
                    🪶
                  </div>
                </div>

                {/* Ritual summary for confirmation */}
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 grid grid-cols-2 gap-4">
                  <div>
                    <Text variant="label" className="opacity-50 text-[9px]">Selected Vibe</Text>
                    <Text variant="body" className="capitalize font-semibold text-accent">{data.vibe || 'None'}</Text>
                  </div>
                  <div>
                    <Text variant="label" className="opacity-50 text-[9px]">Intensity</Text>
                    <Text variant="body" className="font-semibold text-accent">{data.intensity}%</Text>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'COMPLETE' && (
            <motion.div
              key="complete"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div className="text-6xl animate-bounce">✨</div>
              <div className="space-y-2">
                <Text variant="h1" className="text-3xl">Ritual Complete</Text>
                <Text variant="body">The sanctuary <span className="text-accent font-bold">&quot;{data.sanctuaryName}&quot;</span> has been successfully invoked.</Text>
              </div>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Restart Lab
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wizard footer */}
      {step !== 'COMPLETE' && <div className="flex justify-between items-center pt-6 border-t border-border-subtle">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={!canGoBack}
        >
          Back
        </Button>
        
        <Button 
          variant="primary" 
          onClick={nextStep} 
          // Lead-level validation: require name before completing
          disabled={
            (step === 1 && !data.vibe) || 
            (step === 3 && data.sanctuaryName.length < 3)
          }
        >
          {step === 3 ? 'Seal Ritual 🪄' : 'Next'}
        </Button>
      </div>}
    </div>
  );
};