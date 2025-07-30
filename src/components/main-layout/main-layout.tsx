import { type FC, Suspense, use } from 'react';
import style from './main-layout.module.scss';
import { Outlet } from 'react-router';
import Loading from '../loading/loading';
import bgPath from '../../assets/image/rick-and-morty-bg.jpg';
import { Header } from '../header/header';
import ThemeContext from '../../core/contexts/contexts';

export const MainLayout: FC = () => {
  const theme = use(ThemeContext);
  return (
    <ThemeContext value={theme}>
      <div
        className={style.layout}
        style={{ background: `url(${bgPath}) center center/cover no-repeat` }}
      >
        <Header />
        <main className={style['layout-content']}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </ThemeContext>
  );
};
