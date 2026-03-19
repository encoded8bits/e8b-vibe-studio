import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h3' | 'body' | 'label';
  className?: string;
}

export const Text = ({ children, variant = 'body', className = '' }: TextProps) => {
  const styles = {
    h1: "text-5xl md:text-7xl font-bold tracking-tighter text-text-main",
    h3: "text-xl font-semibold text-text-main",
    // Cambiamos accent/60 por text-dim para que use el gris/verde oscuro en light mode
    body: "text-sm leading-relaxed text-text-dim", 
    // El label puede mantener un toque de accent pero con más fuerza o usar text-dim
    label: "text-[10px] uppercase tracking-[0.2em] text-accent font-semibold"
  };

  const Component = variant === 'body' || variant === 'label' ? 'p' : variant;
  return <Component className={`${styles[variant]} ${className}`}>{children}</Component>;
};