"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Importamos ambos temas
import { coldarkDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = ({ code, language = 'typescript' }: CodeBlockProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="rounded-xl overflow-hidden border border-border-subtle shadow-2xl transition-all duration-500">
      {/* Header del Codeblock */}
      <div className="bg-surface-secondary px-4 py-2 border-b border-border-subtle flex justify-between items-center transition-colors duration-500">
        <div className="flex gap-1.5 opacity-50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
        </div>
        <span className="text-[10px] text-text-dim/50 uppercase tracking-widest font-mono">
          {language}
        </span>
      </div>

      <SyntaxHighlighter 
        language={language} 
        // Cambiamos el estilo dinámicamente según el tema 🌓
        style={isDark ? coldarkDark : oneLight}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.875rem',
          // Usamos variables CSS para el fondo
          backgroundColor: isDark ? 'var(--color-surface-primary)' : '#fdfdfb',
          transition: 'all 0.5s ease',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};