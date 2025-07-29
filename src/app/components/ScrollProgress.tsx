"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number;
    let isScrolling = false;
    
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      
      // Continue updating while scrolling
      if (isScrolling) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(updateProgress);
      }
      
      // Stop continuous updates after scrolling stops
      clearTimeout(rafId);
      setTimeout(() => {
        isScrolling = false;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const checkScrollable = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(scrollPercent);
      setIsScrollable(docHeight > 0);
    };

    // Small delay to ensure content is rendered after route change
    const timeoutId = setTimeout(checkScrollable, 50);
    
    window.addEventListener("resize", checkScrollable, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [pathname]);

  if (!isScrollable) return null;

  return (
    <div className="fixed top-[50svh] right-[2%] -translate-y-1/2 w-1.5 h-[100px] rounded-full bg-foreground/20 overflow-hidden z-50">
      <div
        className="w-full bg-primary rounded-full h-full"
        style={{ transform: `translateY(${scrollProgress - 100}%)` }}
      />
    </div>
  );
}