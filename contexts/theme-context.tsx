import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '@/constants/theme';
import { Theme } from '@/models/theme';

interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentTheme: Theme;
  isThemeLoading: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  currentTheme: darkTheme,
  isThemeLoading: true,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isThemeLoading, setIsThemeLoading] = useState(true);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          setTheme(savedTheme);
        }
      } catch (e) {
        console.error('Failed to load theme.', e);
      } finally {
        setIsThemeLoading(false);
      }
    };
    getTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme.', e);
    }
  };

  const currentTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme, isThemeLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};
