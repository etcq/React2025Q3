'use client';

import ThemeContext from '../../core/contexts/contexts';
import { IChildrenNode } from '../../core/interfaces/interface';
import { useState } from 'react';
import { THEME } from '../../core/constants/constants.ts';

export default function ThemeProvider({ children }: IChildrenNode) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    );
  };

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext>
  );
}
