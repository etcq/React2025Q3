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

const Search: FC = () => {
  const [query, setQuery] = useState('');
  const [charList, setCharList] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleClick = useCallback(
    (name: string = query) => {
      setLoading(true);
      getCharacters(name)
        .then((newCharList) => {
          setCharList(newCharList);
        })
        .catch(() => {
          setCharList([]);
        })
        .finally(() => setLoading(false));
    },
    [query]
  );

  useEffect(() => {
    setQuery(localStorage.getItem('search-query') || '');
    handleClick();
  }, [handleClick, setQuery]);
  const handleChangeQuery = (query: string): void => {
    setQuery(query);
    localStorage.setItem('search-query', query);
  };

  return (
    <div
      className={style.search}
      style={{ background: `url(${bgPath}) center center/cover no-repeat` }}
    >
      <h1 className={style['search-header']}>Rick and Morty</h1>
      <span className={style['search-subheader']}>characters database</span>
      <SearchForm
        query={query}
        setQuery={handleChangeQuery}
        clickFn={handleClick}
      />
      <div className={style['search-results']}>
        {isLoading ? (
          <Loading />
        ) : (
          <ErrorBoundary>
            <CardList charList={charList} />
          </ErrorBoundary>
        )}
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
