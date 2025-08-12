import { type FC, use } from 'react';
import style from './header.module.scss';
import Button from '../ui/button/button';
import ThemeContext from '../../core/contexts/contexts.ts';
import { ThemeSwitcher } from '../ui/theme-switcher/theme-switcher.tsx';

export const Header: FC = () => {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <div className={`${style.header}`}>
      <h1 className={style['header-main']}>Rick and Morty</h1>
      <span className={style['header-secondary']}>characters database</span>
      <Button callback={() => {}} className={style['header-about-btn']}>
        About Me
      </Button>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};
