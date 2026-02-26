import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';

export function useThemeMode(defaultTheme = 'dark') {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || defaultTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((value) => (value === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
