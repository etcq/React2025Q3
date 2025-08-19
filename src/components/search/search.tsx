'use client';

import { useEffect } from 'react';
import style from './search.module.scss';
import {
  ErrorMessage,
  Loading,
  CardList,
  SearchForm,
  PaginationControls,
} from '@components';
import { Button } from '@ui';
import { useLocalStorage } from '@hooks/use-local-storage.ts';
import { LOCAL_STORAGE_KEY } from '@constants';
import { usePaginationStore } from '@stores/pagination-store';
import { useQueryCharacters } from '@hooks/query-hooks/use-query-characters.ts';
import type { IChildrenNode } from '@interfaces';
import { useParamsUpdate } from '@hooks/use-params-update.ts';
import { useTranslations } from 'next-intl';

export function Search({ children }: IChildrenNode) {
  const f = useTranslations('Search');
  const { savedQuery, setQueryToLocalStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY);

  const { page, setMaxPage } = usePaginationStore((state) => state);
  const { data, isPending, isError, error, isFetching, resetListData } =
    useQueryCharacters(savedQuery, page);

  useParamsUpdate(page, savedQuery);

  useEffect(() => {
    if (data) {
      setMaxPage(data.maxPage);
    }
  }, [setMaxPage, data]);

  return (
    <div className={style.search}>
      <SearchForm
        savedQuery={savedQuery}
        setQueryToLocalStorage={setQueryToLocalStorage}
      />
      <div className={style['search-results']}>
        {isPending || isFetching ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage message={error?.message} />
        ) : (
          <>
            <PaginationControls />
            <div className={style['list-wrapper']}>
              <CardList charList={data?.characters} />
              {children}
            </div>
          </>
        )}
      </div>
      <div className={style['search-feature']}>
        <Button
          callback={() => setQueryToLocalStorage('invalid')}
          text={f('error')}
          className={style['error-button']}
          isError={true}
        />
        <Button
          callback={resetListData}
          className={style['search-feature-reset-btn']}
          text={f('refetch')}
        />
      </div>
    </div>
  );
}

export default Search;
