import { type FC, use } from 'react';
import style from './header.module.scss';
import Button from '../ui/button/button';
import { useNavigate } from 'react-router';
import ThemeContext from '../../core/contexts/contexts.ts';
import { ThemeSwitcher } from '../ui/theme-switcher/theme-switcher.tsx';

export const Header: FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <div className={`${style.header} ${style[theme]}`}>
      <h1 className={style['header-main']}>Rick and Morty</h1>
      <span className={style['header-secondary']}>characters database</span>
      <Button
        callback={() => void navigate('about')}
        className={style['header-about-btn']}
      >
        About Me
      </Button>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};
