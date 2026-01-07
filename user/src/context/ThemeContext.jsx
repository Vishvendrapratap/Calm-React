"use client"


import { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '../styles/themes';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('primary');

  useEffect(() => {
    const theme = THEMES[themeName];
    if (!theme) return;

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName((prev) =>
      prev === 'primary' ? 'secondary' : 'primary'
    );
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
