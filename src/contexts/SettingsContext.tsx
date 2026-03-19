import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SettingsContextType {
  aboutImages: string[];
  setAboutImage: (index: number, base64: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [aboutImages, setAboutImagesState] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length === 4) {
          setAboutImagesState(data);
        }
      })
      .catch(e => {
        console.error("Could not fetch about images from DB", e);
      });
  }, []);

  const setAboutImage = useCallback(async (index: number, base64: string) => {
    setAboutImagesState((prev) => {
      const newImages = [...prev];
      newImages[index] = base64;
      
      fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newImages),
      }).catch(e => console.error('Failed to update settings DB', e));
      
      return newImages;
    });
  }, []);

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

