import en from '@/dictionaries/en.json';
import tw from '@/dictionaries/tw.json';

export type Locale = 'en' | 'tw';

export interface LanguageConfig {
  code: Locale;
  label: string;
  nativeLabel: string;
  flag?: string;
}

export const languages: LanguageConfig[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN', flag: 'us' },
  { code: 'tw', label: 'Traditional Chinese', nativeLabel: '繁中', flag: '🇹🇼' },
];

const dictionaries = {
  en: () => en,
  tw: () => tw,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};

export const getLanguageByCode = (code: Locale): LanguageConfig | undefined => {
  return languages.find(lang => lang.code === code);
};

export const detectSystemLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'en'; // SSR fallback
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  
  // Any language starting with "zh" is Chinese
  const langCode = browserLang.split('-')[0];
  if (langCode === 'zh') {
    return 'tw';
  }
  
  // default English
  return 'en';
};