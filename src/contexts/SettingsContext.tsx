import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  aboutImages: string[];
  setAboutImage: (index: number, base64: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'quinta_settings_about_images';

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [aboutImages, setAboutImagesState] = useState<string[]>(['', '', '', '']);

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 4) {
          setAboutImagesState(parsed);
        }
      } catch (e) {
        console.error("Could not parse about images", e);
      }
    }
  }, []);

  const setAboutImage = (index: number, base64: string) => {
    setAboutImagesState((prev) => {
      const newImages = [...prev];
      newImages[index] = base64;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
      return newImages;
    });
  };

  return (
    <SettingsContext.Provider value={{ aboutImages, setAboutImage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
