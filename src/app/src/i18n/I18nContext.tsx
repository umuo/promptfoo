import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { translations } from './locales';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './types';

const LANGUAGE_STORAGE_KEY = 'promptfoo_language';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (path: string, params?: Record<string, string | number>, fallback?: string) => string;
  isZh: boolean;
  isEn: boolean;
  availableLanguages: typeof SUPPORTED_LANGUAGES;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return 'en';
  }

  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'zh-CN' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore localStorage access failures
  }

  try {
    const navLang =
      navigator.language || (navigator as unknown as { userLanguage?: string }).userLanguage || '';
    if (navLang.toLowerCase().startsWith('zh')) {
      return 'zh-CN';
    }
  } catch {
    // Ignore navigator access failures
  }

  return 'en';
}

function resolveNestedKey(obj: unknown, path: string): string | undefined {
  if (!obj || typeof obj !== 'object') {
    return undefined;
  }
  const keys = path.split('.');
  let current: unknown = obj;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return key in params ? String(params[key]) : match;
  });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'zh-CN' ? 'zh-Hans' : 'en';
    }
  }, [language]);

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch (e) {
      console.warn('[i18n] Failed to persist language to localStorage', e);
    }
  }, []);

  const t = useCallback(
    (path: string, params?: Record<string, string | number>, fallback?: string): string => {
      const currentDictionary = translations[language];
      const fallbackDictionary = translations.en;

      let text = resolveNestedKey(currentDictionary, path);
      if (text === undefined) {
        text = resolveNestedKey(fallbackDictionary, path);
      }
      if (text === undefined) {
        text = fallback === undefined ? path : fallback;
      }

      return interpolate(text, params);
    },
    [language],
  );

  const value = useMemo<I18nContextType>(
    () => ({
      language,
      setLanguage,
      t,
      isZh: language === 'zh-CN',
      isEn: language === 'en',
      availableLanguages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const defaultI18nContextValue: I18nContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (path: string, params?: Record<string, string | number>, fallback?: string) => {
    let text = resolveNestedKey(translations.en, path);
    if (text === undefined) {
      text = fallback === undefined ? path : fallback;
    }
    return interpolate(text, params);
  },
  isZh: false,
  isEn: true,
  availableLanguages: SUPPORTED_LANGUAGES,
};

export function useI18nContext(): I18nContextType {
  const ctx = useContext(I18nContext);
  return ctx || defaultI18nContextValue;
}
