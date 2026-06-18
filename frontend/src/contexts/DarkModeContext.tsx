import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const DarkModeContext = createContext({
  isDark: false,
  toggle: () => {},
});

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // localStorage unavailable
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((prev) => !prev), []);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
