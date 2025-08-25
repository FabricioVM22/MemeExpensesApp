import React, { createContext, useContext, useMemo } from 'react';
import { en, TranslationKey } from '../locales/en';
import { es } from '../locales/es';

const translations = {
  en,
  es,
};

const getLocale = (): 'en' | 'es' => {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language.split(/[-_]/)[0];
  return lang === 'es' ? 'es' : 'en';
};

interface LocalizationContextType {
  locale: 'en' | 'es';
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocale();
  const langFile = translations[locale];

  const t = useMemo(() => (key: TranslationKey, replacements?: Record<string, string | number>): string => {
    let translation = langFile[key] || en[key]; // Fallback to English
    if (replacements) {
        Object.entries(replacements).forEach(([rKey, value]) => {
            translation = translation.replace(`\${${rKey}}`, String(value));
        });
    }
    return translation;
  }, [locale, langFile]);

  const value = { locale, t };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
