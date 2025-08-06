import { type FC, useEffect } from 'react';
import style from './search.module.scss';
import SearchForm from '../../components/search-form/search-form';
import { getCharacters } from '../../core/services/api-service.ts';
import Loading from '../../components/loading/loading.tsx';
import Button from '../../components/ui/button/button.tsx';
import { useLocalStorage } from '../../core/hooks/use-local-storage.ts';
import { LOCAL_STORAGE_KEY } from '../../core/constants/constants.ts';
import { ResultLayout } from '../../components/result-layout/ResultLayout.tsx';
import { useParamsUpdate } from '../../core/hooks/use-params-update.ts';
import { SearchControls } from '../../components/search-controls/search-controls.tsx';
import { useQuery } from '@tanstack/react-query';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';
import ErrorMessage from '../../components/error-message/error-message.tsx';

const Search: FC = () => {
  const { savedQuery, setQueryToLocalStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY);
  const { page, setMaxPage } = usePaginationStore((state) => state);

  const { data, isPending, isError } = useQuery({
    queryKey: ['characters', savedQuery, page],
    queryFn: () => getCharacters(savedQuery, page),
    staleTime: 1000 * 60 * 30,
    retry: false,
  });

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
        {isPending ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage />
        ) : (
          <>
            <SearchControls />
            <ResultLayout charList={data?.characters} />
          </>
        )}
      </div>
      <Button
        callback={() => setQueryToLocalStorage('invalid')}
        text="Error"
        className={style['error-button']}
        isError={true}
      />
    </div>
  );
};

export default Search;
