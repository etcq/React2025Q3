import type { ReactNode } from 'react';
import style from './search.module.scss';
import PaginationControls from '../../../components/pagination-controls/pagination-controls';
import SearchForm from '../../../components/search-form/search-form';

export default async function SearchLayout({
  list,
  window,
}: {
  list: ReactNode;
  window: ReactNode;
}) {
  return (
    <div className={style.search}>
      <SearchForm />
      <div className={style['search-results']}>
        <PaginationControls />
        <div className={style['list-wrapper']}>
          {list}
          {window}
        </div>
      </div>
    </div>
  );
}
