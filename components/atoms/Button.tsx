import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

/**
 * Fundamental Button Atom ✨
 * Designed with Tailwind v4 theme tokens.
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-500 active:scale-95 cursor-pointer flex items-center gap-2";
  
  const variants = {
    primary: "bg-brand-gold text-brand-jungle hover:bg-white hover:shadow-[0_0_30px_rgba(226,176,94,0.4)]",
    outline: "border-2 border-brand-gold/50 text-accent hover:border-brand-gold hover:bg-brand-gold/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};