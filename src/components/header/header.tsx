'use client';

import { type FC, use } from 'react';
import style from './header.module.scss';
import ThemeContext from '../../core/contexts/contexts.ts';
import { ThemeSwitcher } from '../ui/theme-switcher/theme-switcher.tsx';
import Link from 'next/link';

export const Header: FC = () => {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <div className={`${style.header}`}>
      <h1 className={style['header-main']}>Rick and Morty</h1>
      <span className={style['header-secondary']}>characters database</span>
      <Link href={'/about'} className={style['header-about-btn']}>
        About Me
      </Link>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};
