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
    body: "text-sm leading-relaxed text-accent/60",
    label: "text-[10px] uppercase tracking-[0.2em] text-accent/50 font-medium"
  };

  const Component = variant === 'body' || variant === 'label' ? 'p' : variant;

  return <Component className={`${styles[variant]} ${className}`}>{children}</Component>;
};