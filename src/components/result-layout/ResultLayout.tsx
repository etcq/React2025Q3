import { type FC } from 'react';
import CardList from '../card-list/card-list';
import { Outlet } from 'react-router';
import type { Character } from '../../core/interfaces/interface';
import style from './result-layout.module.scss';
import ErrorBoundary from '../error-boundary/error-boundary';

export const ResultLayout: FC<{ charList: Character[] }> = ({ charList }) => {
  return (
    <div className={style['list-wrapper']}>
      <ErrorBoundary>
        <CardList charList={charList} />
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};
