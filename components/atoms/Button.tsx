import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-500 active:scale-95 cursor-pointer flex items-center gap-2 justify-center";
  
  const variants = {
    // PRIMARY: Usa el token accent. 
    // En Light Mode, el texto cambia a surface-secondary (blanco/hueso) para contraste.
    primary: `
      bg-accent text-surface-secondary 
      hover:opacity-90 hover:shadow-[0_0_25px_var(--color-accent)] 
      shadow-md
    `,
    
    // OUTLINE: Usa border-subtle por defecto y accent en hover.
    outline: `
      border-2 border-accent/30 text-accent 
      hover:border-accent hover:bg-accent/5
    `
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};