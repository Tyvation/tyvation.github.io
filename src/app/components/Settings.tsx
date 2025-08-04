'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-2 right-4 z-50">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full liquid-glass border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-primary/70 ${
          isOpen ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted/50'
        }`}
        aria-label="Settings"
      >
        <SettingsIcon 
          size={22} 
          className={`transition duration-300 ${isOpen ? 'rotate-90 text-background' : 'text-foreground'}`} 
        />
      </button>

      <div
        ref={dropdownRef}
        className={`flex top-2 right-0 w-12 h-24 items-center justify-center rounded-full liquid-glass border transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto overflow-visible'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-1 h-full">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}