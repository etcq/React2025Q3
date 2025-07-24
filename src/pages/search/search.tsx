import { type FC, useCallback, useEffect, useState } from 'react';
import style from './search.module.scss';
import SearchForm from '../../components/search-form/search-form';
import CardList from '../../components/card-list/card-list';
import type { Character } from '../../core/interfaces/interface.ts';
import ErrorBoundary from '../../components/error-boundary/error-boundary';
import { getCharacters } from '../../core/services/api-service.ts';
import bgPath from '../../assets/image/rick-and-morty-bg.jpg';
import Loading from '../../components/loading/loading.tsx';
import Button from '../../components/ui/button/button.tsx';
import { useLocalStorage } from '../../core/hooks/useLocalStorage.ts';
import { LOCAL_STORAGE_KEY } from '../../core/constants/constants.ts';
import { usePagination } from '../../core/hooks/usePagination.ts';

const Search: FC = () => {
  const [charList, setCharList] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { savedQuery, setQueryLS } = useLocalStorage(LOCAL_STORAGE_KEY);
  const { page, setPage, maxPage, setMaxPage, prevPage, nextPage } =
    usePagination();

  const handleClick = useCallback(
    (name: string = savedQuery, queryPage: number = page) => {
      console.log(savedQuery, queryPage);
      setLoading(true);
      getCharacters(name, queryPage)
        .then((response) => {
          setCharList(response.characters);
          setMaxPage(response.maxPage);
        })
        .catch(() => {
          setCharList([]);
        })
        .finally(() => setLoading(false));
    },
    [savedQuery, page, setMaxPage]
  );

  useEffect(() => {
    handleClick();
  }, [handleClick, savedQuery]);

  return (
    <div
      className={style.search}
      style={{ background: `url(${bgPath}) center center/cover no-repeat` }}
    >
      <h1 className={style['search-header']}>Rick and Morty</h1>
      <span className={style['search-subheader']}>characters database</span>
      <SearchForm
        clickFn={handleClick}
        setPage={setPage}
        savedQuery={savedQuery}
        setQueryLS={setQueryLS}
      />
      <div className={style['search-results']}>
        <Button
          callback={prevPage}
          text="Prev Page"
          className={style['next-page-button']}
          disabled={page <= 1}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <ErrorBoundary>
            <CardList charList={charList} />
          </ErrorBoundary>
        )}
        <Button
          callback={nextPage}
          text="Next Page"
          className={style['next-page-button']}
          disabled={page >= maxPage}
        />
      </div>
      <Button
        callback={() => handleClick('qwe213')}
        text="Error"
        className={style['error-button']}
      />
    </div>
  );
};

export default Search;
