import React, { createContext, useContext, useState } from 'react';
import { Language } from '@/i18n/translations';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (obj: Record<Language, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'pt' : 'en'));
  const t = (obj: Record<Language, string>) => obj[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
