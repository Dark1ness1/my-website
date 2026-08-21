// src/context/LanguageContext.tsx
'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Content } from '@/lib/content';
import type { Lang } from '@/lib/format';

const STORAGE_KEY = 'site:lang';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  /** 't' stands for translation. */
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'de';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start on 'en' so the server render and the first client render
  // agree; the stored preference is applied immediately after hydration.
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) setLangState(stored);
    } catch {
      // Private browsing can throw on localStorage access — English is fine.
    }
  }, []);

  // Keep <html lang> honest for screen readers and translation tools.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === 'en' ? 'de' : 'en';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, toggleLang, setLang, t: translations[lang] }),
    [lang, toggleLang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Read the active language and its strings from anywhere in the tree. */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
