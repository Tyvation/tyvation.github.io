'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { languages, type Locale } from '@/lib/dictionaries';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
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

  const handleLanguageSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
          isOpen 
            ? 'bg-accent text-background' 
            : 'text-background'
        }`}
        aria-label="Language"
      >
        <Globe size={22} />
      </button>

      <div
        ref={dropdownRef}
        className={`absolute top-0 right-10 liquid-glass rounded-lg p-1 transition-all duration-200 ease-out z-50 max-h-24 overflow-y-auto ${
          isOpen
            ? 'opacity-100 -translate-x-3 pointer-events-auto'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1 min-w-fit">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 whitespace-nowrap flex items-center gap-2 hover:scale-105 ${
                locale === language.code
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title={language.label}
            >
              {language.flag && <span className="text-xs">{language.flag}</span>}
              <span>{language.nativeLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}