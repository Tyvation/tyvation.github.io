"use client";
import { useState, useEffect, useRef } from "react";
import { Home, FolderKanban, Mail, User} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export default function FloatingNavbar() {
  const { t } = useLocale();
  const [activeSection, setActiveSection] = useState("home");
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  
  const navItems = [
    { href: "#home", icon: <Home size={22} />, label: t("nav.home") },
    { href: "#about", icon: <User size={22} />, label: t("nav.about") },
    { href: "#projects", icon: <FolderKanban size={22} />, label: t("nav.projects") },
    { href: "#contact", icon: <Mail size={22} />, label: t("nav.contact") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const cancelAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    isAnimatingRef.current = false;
    
    // Remove event listeners
    window.removeEventListener('wheel', cancelAnimation);
    window.removeEventListener('touchstart', cancelAnimation);
    window.removeEventListener('keydown', cancelAnimation);
  };

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      // Cancel any existing animation
      cancelAnimation();
      
      const headerOffset = 20;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 800; // 800ms animation
      let start: number | null = null;
      
      isAnimatingRef.current = true;
      
      // Add event listeners to detect user interaction
      window.addEventListener('wheel', cancelAnimation, { passive: true });
      window.addEventListener('touchstart', cancelAnimation, { passive: true });
      window.addEventListener('keydown', cancelAnimation);

      const step = (timestamp: number) => {
        if (!isAnimatingRef.current) return; // Animation was cancelled
        
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = progress * (2 - progress); // easeOutQuad
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          cancelAnimation(); // Clean up when animation completes
        }
      };

      animationRef.current = requestAnimationFrame(step);
    }
  };

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 liquid-glass border rounded-full px-2 py-1 flex gap-4 items-center overflow-visible">
      {navItems.map((item) => {
        const sectionId = item.href.substring(1);
        const isActive = activeSection === sectionId;
        return (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className={`relative group w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${
              isActive
                ? "liquid-glass bg-primary text-background"
                : "text-foreground"
            }`}
          >
            {item.icon}
            <span className="absolute top-12 left-1/2 -translate-x-1/2 text-xs text-foreground bg-background/50 px-2 py-1 rounded-md opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-120 transition duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
