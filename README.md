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

---

## 🏗️ Architectural Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | High-performance Server-side Rendering & Routing. |
| **UI Library** | React 19 | Cutting-edge state management and latest hooks. |
| **Styling** | Tailwind CSS v4 | Utility-first design with native CSS variables. |
| **Animations** | Framer Motion | Micro-interactions and high-fidelity visual feedback. |
| **Deployment** | Vercel | Global Edge Infrastructure & Automated CI/CD. |

---

## 🛠️ Atomic Structure (Design System)

The project follows the Atomic Design methodology to ensure modularity and scalability:

- **Atoms:** `Button`, `Text`, `ProgressBar`, `CodeBlock`.
- **Molecules:** `SpellCard`, `ThemeToggle`.
- **Organisms:** `Navbar`, `InvokeRitual`, `CodeExperiment`.
- **Templates/Pages:** `VibeCheckPage`.

---

## 🚀 Local Installation

```bash
# Clone the ritual
git clone [https://github.com/your-username/e8b-vibe-studio.git](https://github.com/your-username/e8b-vibe-studio.git)

# Install dependencies
npm install

# Start the laboratory
npm run dev