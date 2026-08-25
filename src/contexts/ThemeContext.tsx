import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type Currency = 'USD' | 'EUR' | 'INR' | 'GBP';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('fiscora-theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {}
    return 'dark'; // default to dark theme for premium feel
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const stored = localStorage.getItem('fiscora-currency');
      if (stored === 'USD' || stored === 'EUR' || stored === 'INR' || stored === 'GBP') return stored;
    } catch (e) {}
    return 'USD';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('fiscora-theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('fiscora-currency', c);
    } catch (e) {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currency, setCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
