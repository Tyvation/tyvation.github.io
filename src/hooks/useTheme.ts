import { useEffect, useState } from "react";
import { useIsHydrated } from "./useIsHydrated";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const isHydrated = useIsHydrated();

  useEffect(() => {
    // Initialize theme from localStorage after hydration
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    // Apply theme changes to DOM
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Only set colorScheme after hydration to avoid mismatch
    if (isHydrated) {
      document.documentElement.style.colorScheme = theme;
    }
  }, [theme, isHydrated]);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme, isHydrated };
}