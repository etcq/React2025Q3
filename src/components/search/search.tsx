'use client';

import { type FC, useEffect } from 'react';
import style from './search.module.scss';
import SearchForm from '../search-form/search-form.tsx';
import Loading from '../loading/loading.tsx';
import Button from '../ui/button/button.tsx';
import { useLocalStorage } from '../../core/hooks/use-local-storage.ts';
import { LOCAL_STORAGE_KEY } from '../../core/constants/constants.ts';
import { ResultLayout } from '../result-layout/ResultLayout.tsx';
// import { useParamsUpdate } from '../../core/hooks/use-params-update.ts';
import { PaginationControls } from '../pagination-controls/pagination-controls.tsx';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';
import ErrorMessage from '../error-message/error-message.tsx';
import { useQueryCharacters } from '../../core/hooks/query-hooks/use-query-characters.ts';

const Search: FC = () => {
  const { savedQuery, setQueryToLocalStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY);
  const { page, setMaxPage } = usePaginationStore((state) => state);
  const { data, isPending, isError, isFetching, resetListData } =
    useQueryCharacters(savedQuery, page);

  // useParamsUpdate(page, savedQuery);

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
          <ErrorMessage />
        ) : (
          <>
            <PaginationControls />
            <ResultLayout charList={data?.characters} />
          </>
        )}
      </div>
      <div className={style['search-feature']}>
        <Button
          callback={() => setQueryToLocalStorage('invalid')}
          text="Error"
          className={style['error-button']}
          isError={true}
        />
        <Button
          callback={resetListData}
          className={style['search-feature-reset-btn']}
        >
          Refetch characters list
        </Button>
      </div>
    </div>
  );
};

export default Search;
