import { type FC, useCallback, useEffect, useState } from 'react';
import style from './search.module.scss';
import SearchForm from '../../components/search-form/search-form';
import type { Character } from '../../core/interfaces/interface.ts';
import { getCharacters } from '../../core/services/api-service.ts';
import Loading from '../../components/loading/loading.tsx';
import Button from '../../components/ui/button/button.tsx';
import { useLocalStorage } from '../../core/hooks/useLocalStorage.ts';
import { LOCAL_STORAGE_KEY } from '../../core/constants/constants.ts';
import { usePagination } from '../../core/hooks/usePagination.ts';
import { ResultLayout } from '../../components/result-layout/ResultLayout.tsx';
import { useQueryUpdate } from '../../core/hooks/useQuery.ts';
import { SearchControls } from '../../components/search-controls/search-controls.tsx';

const Search: FC = () => {
  const [charList, setCharList] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { savedQuery, setQueryLS } = useLocalStorage(LOCAL_STORAGE_KEY);
  const { page, resetPage, maxPage, setMaxPage, prevPage, nextPage } =
    usePagination();
  useQueryUpdate(page, savedQuery);

  const handleClick = useCallback(
    (name: string, queryPage: number) => {
      setShowControls(false);
      setLoading(true);
      getCharacters(name, queryPage)
        .then((response) => {
          setCharList(response.characters);
          setMaxPage(response.maxPage);
          setShowControls(true);
        })
        .catch(() => {
          setCharList([]);
          setShowControls(false);
        })
        .finally(() => setLoading(false));
    },
    [setMaxPage]
  );

  useEffect(() => {
    handleClick(savedQuery, page);
  }, [handleClick, savedQuery, page]);

  return (
    <div className={style.search}>
      <SearchForm
        clickFn={handleClick}
        resetPage={resetPage}
        savedQuery={savedQuery}
        setQueryLS={setQueryLS}
      />
      <div className={style['search-results']}>
        <span>{page}</span>
        {showControls && (
          <SearchControls
            page={page}
            maxPage={maxPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
        {isLoading ? <Loading /> : <ResultLayout charList={charList} />}
      </div>
      <Button
        callback={() => handleClick('qwe213', page)}
        text="Error"
        className={style['error-button']}
        isError={true}
      />
    </div>
  );
};

export default Search;
