'use client';

import { type FC, useState } from 'react';
import style from './main-layout.module.scss';
import { Header } from '../header/header';
import ThemeContext from '../../core/contexts/contexts';
import { THEME } from '../../core/constants/constants.ts';
import { FlyoutCharacters } from '../flyout-characters/flyout-characters.tsx';
import { IChildrenNode } from '../../core/interfaces/interface.ts';

export const MainLayout: FC<IChildrenNode> = ({ children }: IChildrenNode) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    );
  };
  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <div
        className={style.wrapper}
        data-testid="main-wrapper"
        data-theme={theme}
      >
        <div
          className={style.layout}
          style={{
            background: `url(${theme === THEME.DARK ? '/backgrounds/rick-and-morty-bg.jpg' : '/backgrounds/rick-and-morty-bg-2.jpg'}) center center/cover no-repeat`,
          }}
        >
          <Header />
          <main className={style['layout-content']}>{children}</main>
        </div>
        <FlyoutCharacters />
      </div>
    </ThemeContext>
  );
};
