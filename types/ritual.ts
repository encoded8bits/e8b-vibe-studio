export type RitualStep = 'VIBE' | 'POWER' | 'SANCTUARY';

export interface RitualData {
  vibe: 'minimalist' | 'brutalist' | 'organic' | null;
  powerLevel: number; // 1-100
  sanctuaryName: string;
}