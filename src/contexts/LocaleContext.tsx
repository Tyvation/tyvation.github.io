'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDictionary, detectSystemLanguage, Locale } from '@/lib/dictionaries';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isHydrated: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    // Initialize locale from localStorage after hydration
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'tw')) {
      setLocaleState(savedLocale);
    } else {
      const systemLang = detectSystemLanguage();
      setLocaleState(systemLang);
      localStorage.setItem('locale', systemLang);
    }
  }, []);

  useEffect(() => {
    // Apply language changes to DOM after hydration
    if (isHydrated) {
      document.documentElement.lang = locale === 'tw' ? 'zh-TW' : 'en';
    }
  }, [locale, isHydrated]);


  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string): string => {
    const translations = getTranslations(locale);
    return getNestedValue(translations, key) || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isHydrated }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Helper function to get nested values from object using dot notation
const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  return path.split('.').reduce((current: unknown, key: string) => {
    return (current as Record<string, unknown>)?.[key];
  }, obj) as string || path;
};

const getTranslations = (locale: Locale): Record<string, unknown> => {
  return getDictionary(locale);
};