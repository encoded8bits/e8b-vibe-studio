"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      attribute="data-theme" // Usamos data-attribute para Tailwind v4
      defaultTheme="dark"    // Tu "Jungle" por defecto
      enableSystem={false}   // Forzamos el "Vibe"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}