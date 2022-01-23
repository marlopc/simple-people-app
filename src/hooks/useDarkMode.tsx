import React from 'react';
import getStorageItem from '../lib/getStorageItem';

interface ThemesTypes {
  types: 'light' | 'dark';
}

export interface Theme {
  current: ThemesTypes['types'],
  toggleTheme: () => void,
}

const useDarkMode = (): Theme => {
  const [theme, setTheme] = React.useState<ThemesTypes['types']>(
    getStorageItem('theme', { default: 'light' })
  );

  const toggleTheme = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', JSON.stringify(newTheme));
    setTheme(newTheme);
  };

  return {
    current: theme,
    toggleTheme,
  };
};

export default useDarkMode;
