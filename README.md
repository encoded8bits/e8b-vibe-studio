# 🏛️ e8b-vibe-studio

> **Senior Frontend Lab** • Atomic Architecture, Digital Rituals, and High-Fidelity UI.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://e8b-vibe-studio.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

This is my personal frontend experimentation laboratory. More than just a portfolio, it is a manifestation of **Atomic Architecture** and semantic design systems applied to the modern web.

---

## 🧪 Core Rituals (Features)

### 🌓 Sanctuary Mode (Semantic Theming)
Implementation of a dual-theme system (Dark/Light) powered by **Semantic Tokens**. We don't use hardcoded colors; we use intent-based variables. "Sanctuary Mode" transforms the interface into an organic, high-contrast technical experience.

### 🪄 The Invoke Ritual (Multi-step Wizard)
A sophisticated 3-step configuration flow built with:
- **Framer Motion:** Seamless state animations and exit transitions.
- **Strict TypeScript:** Management of literal unions for robust step-by-step navigation.
- **Atomic Progress:** A reactive Progress Bar atom providing real-time visual feedback for "invocation intensity."

### 🪶 Code Experimentation Lab
Advanced logic visualization through a **polymorphic CodeBlock component** that dynamically adapts its syntax highlighting based on the active system theme.

### 🪶 The Alchemist’s Pointer (Canvas Engine)
High-performance **custom cursor** built on the **HTML5 Canvas 2D API**, composed as a thin **Atomic** surface (`Cursor`) over a dedicated engine layer.

- **Particle pipeline:** Star and radial “dot” sparkles with per-frame physics (friction, drift, twinkle), capped pool size, and **device pixel ratio**–aware canvas sizing for crisp rendering.
- **Spawn tiers:** `trail` (movement), `burst` (entering interactive targets), and `intense` (ritual-scale bursts)—typed as `SparkleSpawnTier` and driven from a single spawn API.
- **Performance discipline:** Cursor position and glow use **direct `transform` updates** and **`requestAnimationFrame`** so the UI thread isn’t spammed with React state on every mouse move.
- **Theme coupling:** Accent color is read from **`--color-accent`** at draw time so sparkles track **Sanctuary / Jungle** modes without hardcoded palette drift.
- **Cross-feature bridge:** `lib/sparkleEvents.ts` dispatches a typed **`CustomEvent`** so **The Invoke Ritual** (e.g. `magic-sparkle` SFX on completion) can trigger the same engine **in sync** with audio—no prop drilling through the tree.
- **Inclusive defaults:** The engine mounts only for **`(pointer: fine)`** and respects **`prefers-reduced-motion: reduce`**; the system cursor is hidden via a scoped body class only while the engine is active.

---

## 🏗️ Architectural Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | High-performance Server-side Rendering & Routing. |
| **UI Library** | React 19 | Cutting-edge state management and latest hooks. |
| **Icons** | Lucide React | Accessible icon set for UI. |
| **Styling** | Tailwind CSS v4 | Utility-first design with native CSS variables. |
| **Theming** | `next-themes` | `data-theme` attribute and theme persistence. |
| **Animations** | Framer Motion | Micro-interactions and high-fidelity visual feedback. |
| **Custom Cursor** | Canvas 2D + DOM portal | Particle sparkles, tiered spawns, `CustomEvent` bridge for ritual / SFX sync. |
| **Deployment** | Vercel | Global Edge Infrastructure & Automated CI/CD. |

---

## 🛠️ Atomic Structure (Design System)

The project follows the Atomic Design methodology to ensure modularity and scalability:

- **Atoms:** `Button`, `Text`, `ProgressBar`, `CodeBlock`, `CardPrimitive`, `Toggle`, `Cursor` (engine in `lib/cursor/` + `hooks/useCursorSuitability`).
- **Molecules:** `SpellCard`.
- **Organisms:** `Navbar`, `InvokeRitual`, `CodeExperiment`, `Footer`.
- **Providers:** `ThemeProvider`.
- **Templates/Pages:** `app/page.tsx` (main landing).

---

## 🚀 Local Installation

**Prerequisites:** Node.js 20+.

```bash
# Clone the ritual
git clone https://github.com/encoded8bits/e8b-vibe-studio.git
cd e8b-vibe-studio

# Install dependencies
npm install

# Start the laboratory
npm run dev
```

### Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start dev server (Turbopack). |
| `npm run build` | Production build. |
| `npm run start` | Run production server locally. |
| `npm run lint` | Run ESLint. |