import { type FC, Suspense, useState } from 'react';
import style from './main-layout.module.scss';
import { Outlet } from 'react-router';
import Loading from '../loading/loading';
import bgPathDark from '../../assets/image/rick-and-morty-bg.jpg';
import bgPathLight from '../../assets/image/rick-and-morty-bg-2.jpg';
import { Header } from '../header/header';
import ThemeContext from '../../core/contexts/contexts';
import { THEME } from '../../core/constants/constants.ts';

export const MainLayout: FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    );
  };
  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <div className={`${style.wrapper} ${style[theme]}`}>
        <div
          className={style.layout}
          style={{
            background: `url(${theme === THEME.DARK ? bgPathDark : bgPathLight}) center center/cover no-repeat`,
          }}
        >
          <Header />
          <main className={style['layout-content']}>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </ThemeContext>
  );
};
