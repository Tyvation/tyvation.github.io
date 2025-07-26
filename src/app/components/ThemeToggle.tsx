"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full text-xl bg-accent hover:scale-110 transition-all duration-300"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}