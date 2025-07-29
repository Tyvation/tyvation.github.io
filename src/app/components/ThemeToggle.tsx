"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full liquid-glass bg-theme-toggle text-t-theme-toggle hover:scale-110 transition-all duration-300 "
    >
      {theme == 'dark'
        ? <Moon size={22} />
        : <Sun size={22} />
      }
      
    </button>
  );
}