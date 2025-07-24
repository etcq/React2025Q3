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
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { CharacterDetailed } from '../../components/character-detailed/character-detailed.tsx';

const Search: FC = () => {
  const [charList, setCharList] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { savedQuery, setQueryLS } = useLocalStorage(LOCAL_STORAGE_KEY);
  const [currentCharacterId, setCurrentCharacterId] = useState(0);
  const { page, resetPage, maxPage, setMaxPage, prevPage, nextPage } =
    usePagination();

  const handleClick = useCallback(
    (name: string = savedQuery, queryPage: number = page) => {
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
        resetPage={resetPage}
        savedQuery={savedQuery}
        setQueryLS={setQueryLS}
      />
      <div className={style['search-results']}>
        {showControls && (
          <div className={style['search-controls']}>
            <Button
              callback={prevPage}
              className={style['page-button']}
              disabled={page <= 1}
            >
              <GrFormPreviousLink />
            </Button>
            <span className={style['search-controls-counter']}>
              {page} / {maxPage}
            </span>
            <Button
              callback={nextPage}
              text="Next Page"
              className={style['page-button']}
              disabled={page >= maxPage}
            >
              <GrFormNextLink />
            </Button>
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <div className={style['list-wrapper']}>
            <ErrorBoundary>
              <CardList
                charList={charList}
                setCharacter={setCurrentCharacterId}
              />
            </ErrorBoundary>
            {currentCharacterId && (
              <CharacterDetailed
                id={currentCharacterId}
                setCharacter={setCurrentCharacterId}
              />
            )}
          </div>
        )}
      </div>
      <Button
        callback={() => handleClick('qwe213')}
        text="Error"
        className={style['error-button']}
        isError={true}
      />
    </div>
  );
};

export default Search;
