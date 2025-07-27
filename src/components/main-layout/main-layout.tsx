import { type FC, Suspense } from 'react';
import style from './main-layout.module.scss';
import { Outlet } from 'react-router';
import Loading from '../loading/loading';
import bgPath from '../../assets/image/rick-and-morty-bg.jpg';
import { Header } from '../header/header';

export const MainLayout: FC = () => {
  return (
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
  );
};
