// src/context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/lib/content';

type Language = 'en' | 'de';
type Content = typeof translations.en;

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: Content; // 't' stands for translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'de' : 'en'));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language anywhere
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}