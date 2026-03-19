export type RitualStep = 1 | 2 | 3 | 'COMPLETE';

export interface RitualData {
  vibe: 'minimalist' | 'brutalist' | 'organic' | null;
  intensity: number; // 0-100 (conectado a nuestra ProgressBar)
  sanctuaryName: string;
}
