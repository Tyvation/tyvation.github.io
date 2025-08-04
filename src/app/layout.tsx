import "@/styles/globals.css";
import { ReactNode } from "react";
import { Archivo_Black, Bebas_Neue } from 'next/font/google';
import Navbar from "@/app/components/Navbar";
import ScrollProgress from "@/app/components/ScrollProgress";
import InteractiveGrid from "./components/InteractiveGrid";
import Settings from "@/app/components/Settings";
import { LocaleProvider } from "@/contexts/LocaleContext";


// Banner-specific fonts
const archivoBlack = Archivo_Black({ weight: ['400'], subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });

// Export for use in components
export { archivoBlack, bebasNeue };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Tyvation | Portfolio</title>
        <link rel="icon" href="/favicon.svg?v=2" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`bg-background text-foreground leading-relaxed tracking-tight relative`}>
        <InteractiveGrid
          color='bg-foreground' 
          hoverColor='bg-primary/50'
          gridSize={60}
          effectRadius={200}
          minLineLength={2}
          maxLineLength={45}
          lineThickness={4}
          gapSize={0}
          transitionDuration={0.5}
          waveAmplitude={8}
          waveSpeed={1}
        />
        <LocaleProvider>
          <Settings />
          <ScrollProgress />
          <main className="max-w-3xl mx-auto px-4 pt-24 pb-12 bg-transparent relative z-10">{children}</main>
          <Navbar />
        </LocaleProvider>
      </body>
    </html>
  );
}
