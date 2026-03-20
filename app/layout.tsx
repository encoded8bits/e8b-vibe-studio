import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer"; // Import the new Organism 🪄
import { ThemeProvider } from "@/components/providers/ThemeProvider"; // Importa el Provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* export const metadata: Metadata = {
  title: "e8b.studio | digital alchemy & future-proof architecture 🏛️🌿",
}; */

// app/layout.tsx

export const metadata = {
  // Título básico para la pestaña del navegador
  title: {
    default: 'e8b-vibe-studio | Chris',
    template: '%s | e8b-vibe-studio',
  },
  description: 'Senior Frontend Lab: Atomic Design & React 19 experimentation.',
  
  // 🌐 Configuración de Open Graph (LinkedIn, FB, WhatsApp)
  openGraph: {
    title: 'e8b-vibe-studio | Frontend Lab by Chris',
    description: 'Manifestation of Atomic Architecture and Semantic Design Systems.',
    url: 'https://e8b-vibe-studio.vercel.app/', // Tu URL de Vercel
    siteName: 'e8b-vibe-studio',
    images: [
      {
        url: '/og-e8b-vibe-studio.png', // 👇 Ruta relativa a la carpeta public
        width: 1200,
        height: 630,
        alt: 'e8b-vibe-studio - Frontend Architecture Lab by Chris',
        type: 'image/png',
      },
    ],
    locale: 'es_CR', // O 'en_US' si prefieres
    type: 'website',
  },
  
  // 🐦 Configuración para Twitter (X)
  twitter: {
    card: 'summary_large_image', // Muestra la imagen grande, no el cuadrito pequeño
    title: 'e8b-vibe-studio | Chris',
    description: 'Senior Frontend Architecture Lab.',
    images: ['/og-e8b-vibe-studio.png'], // Misma imagen
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
