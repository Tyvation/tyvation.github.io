"use client";
import { useState, useEffect, useRef } from "react";
import { Home, FolderKanban, Mail, User} from "lucide-react";
import ThemeToggle from "@/app/components/ThemeToggle";

const navItems = [
  { href: "#home", icon: <Home size={22} />, label: "Home" },
  { href: "#about", icon: <User size={22} />, label: "About" },
  { href: "#projects", icon: <FolderKanban size={22} />, label: "Projects" },
  { href: "#contact", icon: <Mail size={22} />, label: "Contact" },
];

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("home");
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

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
      
      const headerOffset = 80;
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
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 liquid-glass border rounded-full px-2 py-1 flex gap-4 items-center">
      {navItems.map((item) => {
        const sectionId = item.href.substring(1);
        const isActive = activeSection === sectionId;
        return (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className={`relative group w-10 h-10 flex items-center justify-center rounded-full transition transform ${
              isActive
                ? "liquid-glass bg-primary text-background hover:bg-primary-hover hover:scale-110 transition-all duration-300"
                : "text-foreground hover:scale-110 bg-transparent duration-300"
            }`}
          >
            {item.icon}
            <span className="absolute bottom-[-1rem] text-xs text-foreground opacity-0 group-hover:opacity-100 group-hover:text-lg group-hover:bottom-[-2rem] transition-all pointer-events-none">
              {item.label}
            </span>
          </button>
        );
      })}
      <ThemeToggle/>
    </nav>
  );
}
