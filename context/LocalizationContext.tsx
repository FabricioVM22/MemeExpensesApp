/**
 * @file Manages the internationalization (i18n) context for the application.
 * This allows the UI to be displayed in different languages based on user selection.
 */
import React, { createContext, useContext, useMemo } from 'react';
// FIX: Corrected import path for locales/en.ts and locales/es.ts
import { en, TranslationKey } from '../locales/en';
import { es } from '../locales/es';
import { useLocalStorage } from '../hooks/useLocalStorage';

// A map of available translation files.
const translations = {
  en,
  es,
};

/**
 * Detects the user's preferred language from the browser settings for initial setup.
 * Defaults to 'en' if the language is not 'es'.
 * @returns The detected locale ('en' or 'es').
 */
const getInitialLocale = (): 'en' | 'es' => {
  if (typeof navigator === 'undefined') return 'en'; // For server-side rendering
  const lang = navigator.language.split(/[-_]/)[0]; // e.g., 'en-US' -> 'en'
  return lang === 'es' ? 'es' : 'en';
};

/**
 * Defines the shape of the localization context.
 */
interface LocalizationContextType {
  /** The current active locale. */
  locale: 'en' | 'es';
  /** Function to set the active locale. */
  setLocale: React.Dispatch<React.SetStateAction<'en' | 'es'>>;
  /**
   * The translation function.
   * @param key - The key of the string to translate.
   * @param replacements - An optional object for dynamic value substitution in the string.
   * @returns The translated string.
   */
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// FIX: Define an explicit props type for the provider to ensure children are correctly typed.
interface LocalizationProviderProps {
  children: React.ReactNode;
}

/**
 * A provider component that wraps the application to make localization
 * functionality available to all child components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns The provider component.
 */
export const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  const [locale, setLocale] = useLocalStorage<'en' | 'es'>('language', getInitialLocale());
  const langFile = translations[locale];

  /**
   * The translation function `t`, memoized for performance.
   * It retrieves a string from the current language file, falling back to English if needed.
   * It also handles replacing placeholders (e.g., `${amount}`) with dynamic values.
   */
  const t = useMemo(() => (key: TranslationKey, replacements?: Record<string, string | number>): string => {
    let translation = langFile[key] || en[key]; // Fallback to English
    if (replacements) {
        Object.entries(replacements).forEach(([rKey, value]) => {
            translation = translation.replace(`\${${rKey}}`, String(value));
        });
    }
    return translation;
  }, [locale, langFile]);

  const value = { locale, setLocale, t };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

/**
 * A custom hook to easily access the localization context (locale, setLocale, and `t` function).
 * @throws Will throw an error if used outside of a `LocalizationProvider`.
 * @returns The localization context.
 */
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};